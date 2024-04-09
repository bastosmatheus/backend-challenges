import { Failure, Success } from "../../errors/either";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetPaymentsInfosByPixService } from "./GetPaymentsInfosByPixService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getPaymentsInfosByPixService: GetPaymentsInfosByPixService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get payments infos by id pix", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getPaymentsInfosByPixService = new GetPaymentsInfosByPixService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get a payments infos by id pix", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(50, 1, 1, null, 1);
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByPixService.execute(1);

    expect(paymentInfos.value.length).toBeGreaterThanOrEqual(3);
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able get a payment infos if the id pix nonexistent", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByPixService.execute(2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("Nenhum pix foi encontrado com o ID: 2");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id pix is not a number", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getPaymentsInfosByPixService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do pix deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id pix has not been inserted", async () => {
    const paymentInfos = await getPaymentsInfosByPixService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do pix é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment infos if the id pix is a number less than 1", async () => {
    const paymentInfos = await getPaymentsInfosByPixService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID do pix não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
