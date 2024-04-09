import { Failure, Success } from "../../errors/either";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetPaymentsInfosByBuyerService } from "./GetPaymentsInfosByBuyerService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getPaymentsInfosByBuyerService: GetPaymentsInfosByBuyerService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get payments infos by id buyer", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getPaymentsInfosByBuyerService = new GetPaymentsInfosByBuyerService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get a payments infos by id buyer", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 2, 1, null);
    await createPaymentInfosService.execute(50, 1, 1, 1, null);
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByBuyerService.execute(1);

    expect(paymentInfos.value.length).toBeGreaterThanOrEqual(3);
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able get a payment infos if the id buyer nonexistent", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByBuyerService.execute(2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 2");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id buyer is not a number", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByBuyerService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do comprador deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id buyer has not been inserted", async () => {
    const paymentInfos = await getPaymentsInfosByBuyerService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do comprador é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id buyer is a number less than 1", async () => {
    const paymentInfos = await getPaymentsInfosByBuyerService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do comprador não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
