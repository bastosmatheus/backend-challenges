type PaymentInfos = {
  id: number;
  price: number;
  id_status: number;
  id_buyer: number;
  id_card: number | null;
  id_pix: number | null;
};

enum EPaymentInfosResponse {
  PaymentInfosNotFound,
  PaymentStatusNotFound,
  BuyerNotFound,
  CardNotFound,
  PixNotFound,
  NoLinkWithCardOrPix,
  ReferenceOnlyForOneCardOrPix,
}

interface IPaymentInfosRepository {
  getAll(): Promise<PaymentInfos[]>;
  getAllByPixs(): Promise<PaymentInfos[]>;
  getAllByCards(): Promise<PaymentInfos[]>;
  getById(id: number): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound>;
  getByStatus(
    id_status: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.PaymentStatusNotFound>;
  getByBuyer(id_buyer: number): Promise<PaymentInfos[] | EPaymentInfosResponse.BuyerNotFound>;
  getByCard(id_card: number): Promise<PaymentInfos[] | EPaymentInfosResponse.CardNotFound>;
  getByPix(id_pix: number): Promise<PaymentInfos[] | EPaymentInfosResponse.PixNotFound>;
  create(
    price: number,
    id_status: number,
    id_buyer: number,
    id_card: number | null,
    id_pix: number | null
  ): Promise<
    | PaymentInfos
    | EPaymentInfosResponse.PaymentStatusNotFound
    | EPaymentInfosResponse.BuyerNotFound
    | EPaymentInfosResponse.CardNotFound
    | EPaymentInfosResponse.PixNotFound
    | EPaymentInfosResponse.NoLinkWithCardOrPix
    | EPaymentInfosResponse.ReferenceOnlyForOneCardOrPix
  >;
  update(
    id: number,
    id_status: number
  ): Promise<
    | PaymentInfos
    | EPaymentInfosResponse.PaymentInfosNotFound
    | EPaymentInfosResponse.PaymentStatusNotFound
  >;
  delete(id: number): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound>;
}

export { IPaymentInfosRepository, EPaymentInfosResponse, PaymentInfos };
