import { Card, ECardResponse, ICardRepository } from "../interfaces/ICardRepository";
import { Buyer } from "../interfaces/IBuyerRepository";
import { sql } from "../database/db";

class CardRepository implements ICardRepository {
  public async getAll(): Promise<Card[]> {
    const cards = await sql<Card[]>/*sql*/ `
      SELECT cards.id, card_holder_name, card_number, cvv, expiration_date, cards.created_at, buyer_name 
      FROM cards
      INNER JOIN buyers ON cards.id_buyer = buyers.id
    `;

    return cards;
  }

  public async getById(id: number): Promise<Card | ECardResponse.CardNotFound> {
    const [card] = await sql<Card[]>/*sql*/ `
      SELECT card_holder_name, card_number, cvv, expiration_date, cards.created_at, buyer_name
      FROM cards
      INNER JOIN buyers ON cards.id_buyer = buyers.id
      WHERE cards.id = ${id}
    `;

    if (typeof card === "undefined") {
      return ECardResponse.CardNotFound;
    }

    return card;
  }

  public async create(
    card_holder_name: string,
    card_number: string,
    cvv: string,
    expiration_date: Date,
    id_buyer: number
  ): Promise<Card | ECardResponse.BuyerNotFound | ECardResponse.CardNumberAlreadyExists> {
    const [card_numberExists] = await sql<Card[]>/*sql*/ `
      SELECT * FROM cards
      WHERE card_number = ${card_number}
    `;

    if (card_numberExists) {
      return ECardResponse.CardNumberAlreadyExists;
    }

    const [buyerExists] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id_buyer}
    `;

    if (!buyerExists) {
      return ECardResponse.BuyerNotFound;
    }

    const [card] = await sql<Card[]>/*sql*/ `
      INSERT INTO cards (card_holder_name, card_number, cvv, expiration_date, id_buyer)
      VALUES (${card_holder_name}, ${card_number}, ${cvv}, ${expiration_date}, ${id_buyer})
    `;

    return card;
  }

  public async update(
    id: number,
    card_holder_name: string,
    cvv: string,
    expiration_date: Date
  ): Promise<Card | ECardResponse.CardNotFound> {
    const [cardExists] = await sql<Card[]>/*sql*/ `
      SELECT * FROM cards
      WHERE id = ${id}
    `;

    if (!cardExists) {
      return ECardResponse.CardNotFound;
    }

    const [card] = await sql<Card[]>/*sql*/ `
      UPDATE cards
      SET card_holder_name = ${card_holder_name}, cvv = ${cvv}, expiration_date = ${expiration_date}
      WHERE id = ${id}
    `;

    return card;
  }

  public async delete(id: number): Promise<Card | ECardResponse.CardNotFound> {
    const [cardExists] = await sql<Card[]>/*sql*/ `
      SELECT * FROM cards
      WHERE id = ${id}
    `;

    if (!cardExists) {
      return ECardResponse.CardNotFound;
    }

    const [card] = await sql<Card[]>/*sql*/ `
      DELETE FROM cards
      WHERE id = ${id}
    `;

    return card;
  }
}

export { CardRepository };
