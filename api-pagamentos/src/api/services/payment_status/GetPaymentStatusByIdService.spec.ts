import { Failure, Success } from "../../errors/either";
import { CreatePaymentStatusService } from "./CreatePaymentStatusService";
import { GetPaymentStatusByIdService } from "./GetPaymentStatusByIdService";
import { InMemoryPaymentStatusRepository } from "../../repositories/in-memory/InMemoryPaymentStatusRepository ";
import { it, describe, expect, beforeEach } from "vitest";

let paymentStatusRepository: InMemoryPaymentStatusRepository;
let getPaymentStatusById: GetPaymentStatusByIdService;
let createPaymentStatusService: CreatePaymentStatusService;

describe("get payment status by id", () => {
  beforeEach(() => {
    paymentStatusRepository = new InMemoryPaymentStatusRepository();
    getPaymentStatusById = new GetPaymentStatusByIdService(paymentStatusRepository);
    createPaymentStatusService = new CreatePaymentStatusService(paymentStatusRepository);
  });

  it("should be able get a payment status by id", async () => {
    await createPaymentStatusService.execute("Aguardando Pagamento");

    const paymentStatus = await getPaymentStatusById.execute(1);

    expect(paymentStatus.value).toHaveProperty("id");
    expect(paymentStatus).toBeInstanceOf(Success);
  });

  it("should not be able get a payment status with id nonexistent", async () => {
    await createPaymentStatusService.execute("Matheus");

    const paymentStatus = await getPaymentStatusById.execute(2);

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual(
      "Nenhum status de pagamento foi encontrado com o ID: 2"
    );
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment status with the id is not a number", async () => {
    await createPaymentStatusService.execute("Matheus");

    const paymentStatus = await getPaymentStatusById.execute("12345678910");

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID deve ser um número");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment status if the id has not been inserted", async () => {
    const paymentStatus = await getPaymentStatusById.execute();

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID é obrigatório");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment status if the id is a number less than 1", async () => {
    const paymentStatus = await getPaymentStatusById.execute(-1);

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID não pode ser menor que 1");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });
});
