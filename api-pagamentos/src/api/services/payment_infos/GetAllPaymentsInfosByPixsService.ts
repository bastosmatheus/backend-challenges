import { PaymentInfos } from "../../interfaces/IPaymentInfosRepository";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";

class GetAllPaymentsInfosByPixsService {
  constructor(private paymentInfosService: PaymentInfosRepository) {}

  public async execute(): Promise<PaymentInfos[]> {
    const paymentInfos = await this.paymentInfosService.getAllByPixs();

    return paymentInfos;
  }
}

export { GetAllPaymentsInfosByPixsService };
