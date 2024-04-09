import { describe, it, beforeEach, expect } from "vitest";
import { CreatePaymentInfosService } from "../payment_infos/CreatePaymentInfosService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { Failure, Success } from "../../errors/either";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let createPaymentInfosService: CreatePaymentInfosService;

describe("create payment infos", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able create a payment infos with id card", async () => {
    const paymentInfos = await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

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

  it("should be able create a payment infos with id pix", async () => {
    const paymentInfos = await createPaymentInfosService.execute(20.5, 1, 1, null, 1);

    expect(paymentInfos.value).toEqual({
      id: 1,
      price: 20.5,
      id_status: 1,
      id_buyer: 1,
      id_card: null,
      id_pix: 1,
    });
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able create a payment infos if the id pix nonexistent", async () => {
    const paymentInfos = await createPaymentInfosService.execute(20.5, 1, 1, null, 2);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toBe("Nenhum pix foi encontrado com o ID: 2");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment infos if the id status nonexistent", async () => {
    const paymentInfos = await createPaymentInfosService.execute(20.5, 3, 1, null, 1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toBe(
      "Nenhum status de pagamento foi encontrado com o ID: 3"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able create a payment infos if the price is not a number", async () => {
    const paymentInfos = await createPaymentInfosService.execute("20.5", 1, 1, null, 1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toBe("O preço do pagamento deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
