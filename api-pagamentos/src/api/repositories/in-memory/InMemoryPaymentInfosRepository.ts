import { Pix } from "../../interfaces/IPixRepository";
import { Card } from "../../interfaces/ICardRepository";
import { Buyer } from "../../interfaces/IBuyerRepository";
import { PaymentStatus } from "../../interfaces/IPaymentStatusRepository";
import {
  EPaymentInfosResponse,
  IPaymentInfosRepository,
  PaymentInfos,
} from "../../interfaces/IPaymentInfosRepository";

class InMemoryPaymentInfosRepository implements IPaymentInfosRepository {
  public readonly paymentsInfos: PaymentInfos[] = [];
  public readonly cards: Card[] = [
    {
      id: 1,
      card_holder_name: "Matheus",
      card_number: "1234567890112345",
      cvv: "321",
      expiration_date: new Date(),
      id_buyer: 1,
    },
    {
      id: 10,
      card_holder_name: "Rodrigo",
      card_number: "1234567890112397",
      cvv: "157",
      expiration_date: new Date(),
      id_buyer: 1,
    },
  ];
  public readonly pixs: Pix[] = [
    {
      id: 1,
      code_generated: "qihew91e0-lkmuih8i012784189osplpakjdmkol3wnjkdh1udjapd,oaksijdfbbjaznopk",
      id_buyer: 1,
    },
    {
      id: 10,
      code_generated:
        "qihew91e0-lkmuih8i012784189osplpakjdmkol3wnjkdh1udjapd,oaksijdfbbjaznoasdwqdpk",
      id_buyer: 1,
    },
  ];
  public readonly buyers: Buyer[] = [
    {
      id: 1,
      cpf: "123456789011",
      buyer_name: "Ronaldinho",
    },
  ];
  public readonly paymentsStatus: PaymentStatus[] = [
    {
      id: 1,
      name_status: "Pago",
    },
  ];

  public async getAll(): Promise<PaymentInfos[]> {
    return this.paymentsInfos;
  }

  public async getAllByPixs(): Promise<PaymentInfos[]> {
    const pixs = this.paymentsInfos.filter((paymentInfos) => paymentInfos.id_pix !== null);

    return pixs;
  }
  public async getAllByCards(): Promise<PaymentInfos[]> {
    const cards = this.paymentsInfos.filter((paymentInfos) => paymentInfos.id_card !== null);

    return cards;
  }

  public async getById(
    id: number
  ): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound> {
    const paymentInfos = this.paymentsInfos.find((paymentInfos) => paymentInfos.id === id);

    if (!paymentInfos) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    return paymentInfos;
  }

  public async getByStatus(
    id_status: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.PaymentStatusNotFound> {
    const paymentStatusExists = this.paymentsStatus.find(
      (paymentStatus) => paymentStatus.id === id_status
    );

    if (!paymentStatusExists) {
      return EPaymentInfosResponse.PaymentStatusNotFound;
    }

    const paymentsInfos = this.paymentsInfos.filter(
      (paymentInfos) => paymentInfos.id_status === id_status
    );

    return paymentsInfos;
  }

  public async getByBuyer(
    id_buyer: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.BuyerNotFound> {
    const buyerExists = this.buyers.find((buyer) => buyer.id === id_buyer);

    if (!buyerExists) {
      return EPaymentInfosResponse.BuyerNotFound;
    }

    const paymentsInfos = this.paymentsInfos.filter(
      (paymentInfos) => paymentInfos.id_buyer === id_buyer
    );

    return paymentsInfos;
  }

  public async getByCard(
    id_card: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.CardNotFound> {
    const cardExists = this.cards.find((card) => card.id === id_card);

    if (!cardExists) {
      return EPaymentInfosResponse.CardNotFound;
    }

    const paymentsInfos = this.paymentsInfos.filter(
      (paymentInfos) => paymentInfos.id_card === id_card
    );

    return paymentsInfos;
  }

  public async getByPix(
    id_pix: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.PixNotFound> {
    const pixExists = this.pixs.find((pix) => pix.id === id_pix);

    if (!pixExists) {
      return EPaymentInfosResponse.PixNotFound;
    }

    const paymentsInfos = this.paymentsInfos.filter(
      (paymentInfos) => paymentInfos.id_pix === id_pix
    );

    return paymentsInfos;
  }

  public async create(
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
  > {
    const paymentStatusExists = this.paymentsStatus.find(
      (paymentStatus) => paymentStatus.id === id_status
    );

    if (!paymentStatusExists) {
      return EPaymentInfosResponse.PaymentStatusNotFound;
    }

    const buyerExists = this.buyers.find((buyer) => buyer.id === id_buyer);

    if (!buyerExists) {
      return EPaymentInfosResponse.BuyerNotFound;
    }

    const cardExists = id_card !== null ? this.cards.find((card) => card.id === id_card) : 1;

    if (!cardExists) {
      return EPaymentInfosResponse.CardNotFound;
    }

    const pixExists = id_pix !== null ? this.pixs.find((pix) => pix.id === id_pix) : 1;

    if (!pixExists) {
      return EPaymentInfosResponse.PixNotFound;
    }

    const paymentInfos = {
      id: 1,
      price,
      id_status,
      id_buyer,
      id_card,
      id_pix,
    };

    this.paymentsInfos.push(paymentInfos);

    return paymentInfos;
  }

  public async update(
    id: number,
    id_status: number
  ): Promise<
    | PaymentInfos
    | EPaymentInfosResponse.PaymentInfosNotFound
    | EPaymentInfosResponse.PaymentStatusNotFound
  > {
    const paymentInfos = this.paymentsInfos.find((paymentInfos) => paymentInfos.id === id);

    if (!paymentInfos) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    const paymentStatus = this.paymentsStatus.find(
      (paymentStatus) => paymentStatus.id === id_status
    );

    if (!paymentStatus) {
      return EPaymentInfosResponse.PaymentStatusNotFound;
    }

    paymentInfos.id_status = id_status;

    return paymentInfos;
  }

  public async delete(
    id: number
  ): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound> {
    const paymentInfos = this.paymentsInfos.find((paymentInfos) => paymentInfos.id === id);

    if (!paymentInfos) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    return paymentInfos;
  }
}

export { InMemoryPaymentInfosRepository };
