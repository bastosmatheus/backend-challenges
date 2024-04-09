import { Failure, Success } from "../../errors/either";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetPaymentsInfosByStatusService } from "./GetPaymentsInfosByStatusService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getPaymentsInfosByStatusService: GetPaymentsInfosByStatusService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get payments infos by id status", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getPaymentsInfosByStatusService = new GetPaymentsInfosByStatusService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get a payments infos by id status", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(50, 1, 1, null, 1);
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByStatusService.execute(1);

    expect(paymentInfos.value.length).toBeGreaterThanOrEqual(4);
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able get a payment infos if the id status nonexistent", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByStatusService.execute(2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual(
      "Nenhum status de pagamento foi encontrado com o ID: 2"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id status is not a number", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByStatusService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID de status deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id status has not been inserted", async () => {
    const paymentInfos = await getPaymentsInfosByStatusService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID de status é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id status is a number less than 1", async () => {
    const paymentInfos = await getPaymentsInfosByStatusService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID de status não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
