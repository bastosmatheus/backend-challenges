import { Failure, Success } from "../../errors/either";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetPaymentsInfosByCardService } from "./GetPaymentsInfosByCardService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getPaymentsInfosByCardService: GetPaymentsInfosByCardService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get payments infos by id card", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getPaymentsInfosByCardService = new GetPaymentsInfosByCardService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get a payments infos by id card", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(20.5, 1, 2, null, 1);
    await createPaymentInfosService.execute(50, 1, 1, null, 1);
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByCardService.execute(1);

    expect(paymentInfos.value.length).toBeGreaterThanOrEqual(1);
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able get a payment infos if the id card nonexistent", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByCardService.execute(2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("Nenhum cartão foi encontrado com o ID: 2");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id card is not a number", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByCardService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do cartão deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id card has not been inserted", async () => {
    const paymentInfos = await getPaymentsInfosByCardService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do cartão é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id card is a number less than 1", async () => {
    const paymentInfos = await getPaymentsInfosByCardService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do cartão não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
