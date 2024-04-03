import { PaymentStatus } from "../../interfaces/IPaymentStatusRepository";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";

class GetAllPaymentsStatusService {
  constructor(private paymentStatusRepository: PaymentStatusRepository) {}

  public async execute(): Promise<PaymentStatus[]> {
    const paymentStatus = await this.paymentStatusRepository.getAll();

    return paymentStatus;
  }
}

export { GetAllPaymentsStatusService };
