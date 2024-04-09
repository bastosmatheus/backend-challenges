import { Failure, Success } from "../../errors/either";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetPaymentInfosByIdService } from "./GetPaymentInfosByIdService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getPaymentInfosByIdService: GetPaymentInfosByIdService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get payment infos by id", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getPaymentInfosByIdService = new GetPaymentInfosByIdService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get a payment infos by id", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentInfosByIdService.execute(1);

    expect(paymentInfos.value).toHaveProperty("id");
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able get a payment infos if the id nonexistent", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentInfosByIdService.execute(2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual(
      "Nenhuma informação de pagamento foi encontrada com o ID: 2"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id is not a number", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentInfosByIdService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id has not been inserted", async () => {
    const paymentInfos = await getPaymentInfosByIdService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id is a number less than 1", async () => {
    const paymentInfos = await getPaymentInfosByIdService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
