import { CreatePaymentInfosService } from "./CreatePaymentInfosService";
import { GetAllPaymentsInfosService } from "./GetAllPaymentsInfosService";
import { InMemoryPaymentInfosRepository } from "../../repositories/in-memory/InMemoryPaymentInfosRepository";
import { it, describe, expect, beforeEach } from "vitest";

let paymentInfosRepository: InMemoryPaymentInfosRepository;
let getAllPaymentsInfosService: GetAllPaymentsInfosService;
let createPaymentInfosService: CreatePaymentInfosService;

describe("get all payments infos", () => {
  beforeEach(() => {
    paymentInfosRepository = new InMemoryPaymentInfosRepository();
    getAllPaymentsInfosService = new GetAllPaymentsInfosService(paymentInfosRepository);
    createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);
  });

  it("should be able get all payments infos", async () => {
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);
    await createPaymentInfosService.execute(20.5, 1, 1, null, 1);
    await createPaymentInfosService.execute(20.5, 1, 1, 1, null);

    const paymentInfos = await getAllPaymentsInfosService.execute();

    expect(paymentInfos.length).toBeGreaterThanOrEqual(3);
  });
});
