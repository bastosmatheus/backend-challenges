import { sql } from "../database/db";
import { Pix } from "../interfaces/IPixRepository";
import { Card } from "../interfaces/ICardRepository";
import { Buyer } from "../interfaces/IBuyerRepository";
import { PaymentStatus } from "../interfaces/IPaymentStatusRepository";
import {
  EPaymentInfosResponse,
  IPaymentInfosRepository,
  PaymentInfos,
} from "../interfaces/IPaymentInfosRepository";

class PaymentInfosRepository implements IPaymentInfosRepository {
  public async getAll(): Promise<PaymentInfos[]> {
    const paymentsInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      LEFT JOIN cards ON payments_infos.id_card = cards.id
      LEFT JOIN pixs ON payments_infos.id_pix = pixs.id
    `;

    return paymentsInfos;
  }

  public async getAllByPixs(): Promise<PaymentInfos[]> {
    const paymentsInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      INNER JOIN pixs ON payments_infos.id_pix = pixs.id
      WHERE payments_infos.id_pix IS NOT NULL 
    `;

    return paymentsInfos;
  }

  public async getAllByCards(): Promise<PaymentInfos[]> {
    const paymentsInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      INNER JOIN cards ON payments_infos.id_card = cards.id
      WHERE payments_infos.id_card IS NOT NULL 
    `;

    return paymentsInfos;
  }

  public async getById(
    id: number
  ): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound> {
    const [paymentInfos] = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      LEFT JOIN cards ON payments_infos.id_card = cards.id
      LEFT JOIN pixs ON payments_infos.id_pix = pixs.id
      WHERE payments_infos.id = ${id}
    `;

    if (typeof paymentInfos === "undefined") {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    return paymentInfos;
  }

  public async getByStatus(
    id_status: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.PaymentStatusNotFound> {
    const [statusExists] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE id = ${id_status}
    `;

    if (!statusExists) {
      return EPaymentInfosResponse.PaymentStatusNotFound;
    }

    const paymentInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      LEFT JOIN cards ON payments_infos.id_card = cards.id
      LEFT JOIN pixs ON payments_infos.id_pix = pixs.id
      WHERE payments_status.id = ${id_status}
    `;

    return paymentInfos;
  }

  public async getByBuyer(
    id_buyer: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.BuyerNotFound> {
    const [buyerExists] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id_buyer}
    `;

    if (!buyerExists) {
      return EPaymentInfosResponse.BuyerNotFound;
    }

    const paymentInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      LEFT JOIN cards ON payments_infos.id_card = cards.id
      LEFT JOIN pixs ON payments_infos.id_pix = pixs.id
      WHERE buyers.id = ${id_buyer}
    `;

    return paymentInfos;
  }

  public async getByCard(
    id_card: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.CardNotFound> {
    const [cardExists] = await sql<Card[]>/*sql*/ `
      SELECT * FROM cards
      WHERE id = ${id_card}
    `;

    if (!cardExists) {
      return EPaymentInfosResponse.CardNotFound;
    }

    const paymentInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, cards.card_holder_name, cards.card_number
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      INNER JOIN cards ON payments_infos.id_card = cards.id
      WHERE cards.id = ${id_card}
    `;

    return paymentInfos;
  }

  public async getByPix(
    id_pix: number
  ): Promise<PaymentInfos[] | EPaymentInfosResponse.PixNotFound> {
    const [pixExists] = await sql<Pix[]>/*sql*/ `
      SELECT * FROM pixs
      WHERE id = ${id_pix}
    `;

    if (!pixExists) {
      return EPaymentInfosResponse.PixNotFound;
    }

    const paymentInfos = await sql<PaymentInfos[]>/*sql*/ `
      SELECT payments_infos.id, payments_infos.price, payments_infos.created_at, payments_status.name_status, buyers.buyer_name, buyers.cpf, pixs.code_generated
      FROM payments_infos
      INNER JOIN payments_status ON payments_infos.id_status = payments_status.id
      INNER JOIN buyers ON payments_infos.id_buyer = buyers.id
      INNER JOIN pixs ON payments_infos.id_pix = pixs.id
      WHERE pixs.id = ${id_pix}
    `;

    return paymentInfos;
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
    | EPaymentInfosResponse.NoLinkWithCardOrPix
    | EPaymentInfosResponse.ReferenceOnlyForOneCardOrPix
  > {
    const [statusExists] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE id = ${id_status}
    `;

    if (!statusExists) {
      return EPaymentInfosResponse.PaymentStatusNotFound;
    }

    const [buyerExists] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id_buyer}
    `;

    if (!buyerExists) {
      return EPaymentInfosResponse.BuyerNotFound;
    }

    if (id_card === null && id_pix === null) {
      return EPaymentInfosResponse.NoLinkWithCardOrPix;
    } else if (id_card !== null && id_pix !== null) {
      return EPaymentInfosResponse.ReferenceOnlyForOneCardOrPix;
    } else if (id_card !== null) {
      const [cardExists] = await sql<Card[]>/*sql*/ `
        SELECT * FROM cards
        WHERE id = ${id_card}
      `;

      if (!cardExists) {
        return EPaymentInfosResponse.CardNotFound;
      }
    } else {
      const [pixExists] = await sql<Pix[]>/*sql*/ `
        SELECT * FROM pixs
        WHERE id = ${id_pix}
      `;

      if (!pixExists) {
        return EPaymentInfosResponse.PixNotFound;
      }
    }

    const [paymentInfos] = await sql<PaymentInfos[]>/*sql*/ `
      INSERT INTO payments_infos (price, id_status, id_buyer, id_card, id_pix)
      VALUES (${price}, ${id_status}, ${id_buyer}, ${id_card}, ${id_pix})

      RETURNING *
    `;

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
    const [paymentInfosExists] = await sql<PaymentInfos[]>/*sql*/ `
      SELECT * FROM payments_infos
      WHERE id = ${id}
    `;

    if (!paymentInfosExists) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    const [paymentStatusExists] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE id = ${id}
    `;

    if (!paymentStatusExists) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    const [paymentInfos] = await sql<PaymentInfos[]>/*sql*/ `
      UPDATE payments_infos
      SET id_status = ${id_status}
      WHERE id = ${id}

      RETURNING *
    `;

    return paymentInfos;
  }

  public async delete(
    id: number
  ): Promise<PaymentInfos | EPaymentInfosResponse.PaymentInfosNotFound> {
    const [paymentInfosExists] = await sql<PaymentInfos[]>/*sql*/ `
      SELECT * FROM payments_infos
      WHERE id = ${id}
    `;

    if (!paymentInfosExists) {
      return EPaymentInfosResponse.PaymentInfosNotFound;
    }

    const [paymentInfos] = await sql<PaymentInfos[]>/*sql*/ `
      DELETE FROM payments_infos
      WHERE id = ${id}
      
      RETURNING *
    `;

    return paymentInfos;
  }
}

export { PaymentInfosRepository };
