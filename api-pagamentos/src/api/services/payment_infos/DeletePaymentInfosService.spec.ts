import { describe, it, beforeEach, expect } from "vitest";
import { CreatePaymentInfosService } from "../payment_infos/CreatePaymentInfosService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { DeletePaymentInfosService } from "../payment_infos/DeletePaymentInfosService";
import { Failure, Success } from "../../errors/either";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let createPaymentInfosService: CreatePaymentInfosService;
let deletePaymentInfosService: DeletePaymentInfosService;

describe("delete payment infos", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
    deletePaymentInfosService = new DeletePaymentInfosService(paymentInfosRepository);
  });

  it("should be able delete a payment infos with id", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await deletePaymentInfosService.execute(1);

    expect(paymentInfos.value).toEqual({
      id: 1,
      price: 20.5,
      id_status: 1,
      id_buyer: 1,
      id_card: 1,
      id_pix: null,
    });
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able delete a payment infos with id nonexistent", async () => {
    const paymentInfos = await deletePaymentInfosService.execute(20);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toBe(
      "Nenhuma informação de pagamento foi encontrada com o ID: 20"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment infos if the id has not been inserted", async () => {
    const paymentInfos = await deletePaymentInfosService.execute();

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toBe("O ID é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able delete a payment info if the id is not a number", async () => {
    const paymentInfos = await deletePaymentInfosService.execute("12345678910");

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able delete a payment info if the id is a number less than 1", async () => {
    const paymentInfos = await deletePaymentInfosService.execute(-1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID não pode ser menor que 1");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
