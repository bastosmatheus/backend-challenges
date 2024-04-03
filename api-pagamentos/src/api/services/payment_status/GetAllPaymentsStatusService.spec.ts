import { CreatePaymentStatusService } from "./CreatePaymentStatusService";
import { GetAllPaymentsStatusService } from "./GetAllPaymentsStatusService";
import { InMemoryPaymentStatusRepository } from "../../repositories/in-memory/InMemoryPaymentStatusRepository ";
import { it, describe, expect, beforeEach } from "vitest";

let paymentStatusRepository: InMemoryPaymentStatusRepository;
let getAllPaymentStatusService: GetAllPaymentsStatusService;
let createPaymentStatusService: CreatePaymentStatusService;

describe("get all payment status", () => {
  beforeEach(() => {
    paymentStatusRepository = new InMemoryPaymentStatusRepository();
    getAllPaymentStatusService = new GetAllPaymentsStatusService(paymentStatusRepository);
    createPaymentStatusService = new CreatePaymentStatusService(paymentStatusRepository);
  });

  it("should be able get all payment status", async () => {
    await createPaymentStatusService.execute("Aguardando Pagamento");
    await createPaymentStatusService.execute("Pago");
    await createPaymentStatusService.execute("Cancelado");

    const paymentStatus = await getAllPaymentStatusService.execute();

    expect(paymentStatus.length).toBeGreaterThanOrEqual(2);
  });
});
