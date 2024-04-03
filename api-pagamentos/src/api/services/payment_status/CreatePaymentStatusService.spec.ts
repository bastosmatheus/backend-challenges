import { Failure, Success } from "../../errors/either";
import { CreatePaymentStatusService } from "./CreatePaymentStatusService";
import { InMemoryPaymentStatusRepository } from "../../repositories/in-memory/InMemoryPaymentStatusRepository ";
import { it, describe, expect, beforeEach } from "vitest";

let paymentStatusRepository: InMemoryPaymentStatusRepository;
let createPaymentStatusService: CreatePaymentStatusService;

describe("create payment status", () => {
  beforeEach(() => {
    paymentStatusRepository = new InMemoryPaymentStatusRepository();
    createPaymentStatusService = new CreatePaymentStatusService(paymentStatusRepository);
  });

  it("should be able create a payment status", async () => {
    const paymentStatus = await createPaymentStatusService.execute("Pago");

    expect(paymentStatus.value).toEqual({
      id: 1,
      name_status: "Pago",
    });
    expect(paymentStatus).toBeInstanceOf(Success);
  });

  it("should not be able create a payment status with same name", async () => {
    const paymentStatus = await createPaymentStatusService.execute("Pago");
    const paymentStatusWithSameName = await createPaymentStatusService.execute("Pago");

    expect(paymentStatusWithSameName.value).toHaveProperty("message");
    expect(paymentStatusWithSameName.value.message).toBe("Esse status já existe");
    expect(paymentStatusWithSameName).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment status with an incorrect status", async () => {
    const paymentStatus = await createPaymentStatusService.execute("fechado");

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual(
      "Informe um tipo válido de status: aguardando pagamento, pago ou cancelado"
    );
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment status if the status name is not a string", async () => {
    const paymentStatus = await createPaymentStatusService.execute(10);

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("O status do pagamento deve ser uma string");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment status if the status name has not been inserted", async () => {
    const paymentStatus = await createPaymentStatusService.execute();

    expect(paymentStatus.value).toHaveProperty("message");
    expect(paymentStatus.value.message).toEqual("Informe o status do pagamento");
    expect(paymentStatus).toBeInstanceOf(Failure);
  });
});
