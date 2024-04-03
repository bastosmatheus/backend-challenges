import {
  PaymentStatus,
  EPaymentStatusResponse,
  IPaymentStatusRepository,
} from "../../interfaces/IPaymentStatusRepository";

class InMemoryPaymentStatusRepository implements IPaymentStatusRepository {
  public readonly paymentsStatus: PaymentStatus[] = [];

  public async getAll(): Promise<PaymentStatus[]> {
    return this.paymentsStatus;
  }

  public async getById(
    id: number
  ): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound> {
    const paymentStatus = this.paymentsStatus.find((paymentStatus) => paymentStatus.id === id);

    if (!paymentStatus) {
      return EPaymentStatusResponse.PaymentStatusNotFound;
    }

    return paymentStatus;
  }

  public async create(
    name_status: string
  ): Promise<PaymentStatus | EPaymentStatusResponse.NameStatusAlreadyExists> {
    const name_statusExists = this.paymentsStatus.find(
      (paymentStatus) => paymentStatus.name_status === name_status
    );

    if (name_statusExists) {
      return EPaymentStatusResponse.NameStatusAlreadyExists;
    }

    const paymentStatus = {
      id: 1,
      name_status,
    };

    this.paymentsStatus.push(paymentStatus);

    return paymentStatus;
  }

  public async delete(
    id: number
  ): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound> {
    const paymentStatus = this.paymentsStatus.find((paymentStatus) => paymentStatus.id === id);

    if (!paymentStatus) {
      return EPaymentStatusResponse.PaymentStatusNotFound;
    }

    this.paymentsStatus.push(paymentStatus);

    return paymentStatus;
  }
}

export { InMemoryPaymentStatusRepository };
