import { describe, it, beforeEach, expect } from "vitest";
import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { UpdatePaymentInfosService } from "../payment_infos/UpdatePaymentInfosService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { Failure, Success } from "../../errors/either";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let updatePaymentInfosService: UpdatePaymentInfosService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("update payment infos", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    updatePaymentInfosService = new UpdatePaymentInfosService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able update a payment infos", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute(1, 1);

    expect(paymentInfos.value).toEqual({
      id: 1,
      price: 98.52,
      id_status: 1,
      id_buyer: 1,
      id_card: 1,
      id_pix: null,
    });
    expect(paymentInfos).toBeInstanceOf(Success);
  });

  it("should not be able update a payment infos if the id nonexistent", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute(20, 1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual(
      "Nenhuma informação de pagamento foi encontrada com o ID: 20"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able update a payment infos if the id status nonexistent", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute(1, 15);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual(
      "Nenhum status de pagamento foi encontrado com o ID: 15"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able update a payment infos if the id status has not been inserted", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute(1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID de status é obrigatório");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able update a payment infos if the id is not a number", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute("1", 1);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual("O ID deve ser um número");
    expect(paymentInfos).toBeInstanceOf(Failure);
  });

  it("should not be able update a payment infos if the id status is a number less than 1", async () => {
    await createPaymentInfosService.execute(98.52, 1, 1, 1, null);

    const paymentInfos = await updatePaymentInfosService.execute(1, 0);

    expect(paymentInfos.value).toHaveProperty("message");
    expect(paymentInfos.value.message).toEqual(
      "Nenhum status de pagamento foi encontrado com o ID: 0"
    );
    expect(paymentInfos).toBeInstanceOf(Failure);
  });
});
