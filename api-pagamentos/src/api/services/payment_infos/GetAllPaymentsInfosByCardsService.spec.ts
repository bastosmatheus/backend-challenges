import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetAllPaymentsInfosByCardsService } from "./GetAllPaymentsInfosByCardsService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getAllPaymentsInfosByCardsService: GetAllPaymentsInfosByCardsService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get all payments infos by cards", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getAllPaymentsInfosByCardsService = new GetAllPaymentsInfosByCardsService(
      paymentInfosRepository
    );
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get all payments infos by cards", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 10, null);
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(28.5, 1, 1, 10, null);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getAllPaymentsInfosByCardsService.execute();

    expect(paymentInfos.length).toBeGreaterThanOrEqual(2);
  });
});
