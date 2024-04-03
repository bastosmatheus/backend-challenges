import { Failure, Success } from "../../errors/either";
import { DeletePaymentStatusService } from "./DeletePaymentStatusService";
import { CreatePaymentStatusService } from "./CreatePaymentStatusService";
import { InMemoryPaymentStatusRepository } from "../../repositories/in-memory/InMemoryPaymentStatusRepository ";
import { it, describe, expect, beforeEach } from "vitest";

let paymentStatusRepository: InMemoryPaymentStatusRepository;
let deletePaymentStatusService: DeletePaymentStatusService;
let createPaymentStatusService: CreatePaymentStatusService;

describe("delete payment status by id", () => {
  beforeEach(() => {
    paymentStatusRepository = new InMemoryPaymentStatusRepository();
    deletePaymentStatusService = new DeletePaymentStatusService(paymentStatusRepository);
    createPaymentStatusService = new CreatePaymentStatusService(paymentStatusRepository);
  });

  it("should be able delete a payment status by id", async () => {
    await createPaymentStatusService.execute("Pago");

    const paymentStatus = await deletePaymentStatusService.execute(1);

    expect(paymentStatus.value).toHaveProperty("id");
    expect(paymentStatus).toBeInstanceOf(Success);
  });

  it("should not be able delete a payment status with id nonexistent", async () => {
    await createPaymentStatusService.execute("Pago");

    const paymentStatus = await deletePaymentStatusService.execute(2);

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual(
      "Nenhum status de pagamento foi encontrado com o ID: 2"
    );
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able delete a payment status with the id is not a number", async () => {
    await createPaymentStatusService.execute("Pago");

    const paymentStatus = await deletePaymentStatusService.execute("12345678910");

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID deve ser um número");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able delete a payment status if the id has not been inserted", async () => {
    const paymentStatus = await deletePaymentStatusService.execute();

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID é obrigatório");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able get a payment status if the id is a number less than 1", async () => {
    const paymentStatus = await deletePaymentStatusService.execute(-1);

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O ID não pode ser menor que 1");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });
});
