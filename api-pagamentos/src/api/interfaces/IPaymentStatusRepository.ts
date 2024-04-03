type PaymentStatus = {
  id: number;
  name_status: string;
};

enum EPaymentStatusResponse {
  PaymentStatusNotFound,
  NameStatusAlreadyExists,
}

interface IPaymentStatusRepository {
  getAll(): Promise<PaymentStatus[]>;
  getById(id: number): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound>;
  create(
    name_status: string
  ): Promise<PaymentStatus | EPaymentStatusResponse.NameStatusAlreadyExists>;
  delete(id: number): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound>;
}

export { IPaymentStatusRepository, EPaymentStatusResponse, PaymentStatus };
