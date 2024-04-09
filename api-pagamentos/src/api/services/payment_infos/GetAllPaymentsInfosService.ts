import { PaymentInfos } from "../../interfaces/IPaymentInfosRepository";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";

class GetAllPaymentsInfosService {
  constructor(private paymentInfosService: PaymentInfosRepository) {}

  public async execute(): Promise<PaymentInfos[]> {
    const paymentInfos = await this.paymentInfosService.getAll();

    return paymentInfos;
  }
}

export { GetAllPaymentsInfosService };
