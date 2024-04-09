import { PaymentInfos } from "../../interfaces/IPaymentInfosRepository";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";

class GetAllPaymentsInfosByCardsService {
  constructor(private paymentInfosService: PaymentInfosRepository) {}

  public async execute(): Promise<PaymentInfos[]> {
    const paymentInfos = await this.paymentInfosService.getAllByCards();

    return paymentInfos;
  }
}

export { GetAllPaymentsInfosByCardsService };
