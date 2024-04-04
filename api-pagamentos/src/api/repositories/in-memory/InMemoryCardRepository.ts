import { Buyer } from "../../interfaces/IBuyerRepository";
import { Card, ECardResponse, ICardRepository } from "../../interfaces/ICardRepository";

class InMemoryCardRepository implements ICardRepository {
  public readonly cards: Card[] = [];
  public readonly buyers: Buyer[] = [
    {
      id: 1,
      name: "Matheus",
      cpf: "12345678901",
    },
  ];

  public async getAll(): Promise<Card[]> {
    return this.cards;
  }

  public async getById(id: number): Promise<Card | ECardResponse.CardNotFound> {
    const card = this.cards.find((card) => card.id === id);

    if (!card) {
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
    const card_numberExists = this.cards.find((card) => card.card_number === card_number);

    if (card_numberExists) {
      return ECardResponse.CardNumberAlreadyExists;
    }

    const buyerExists = this.buyers.find((buyer) => buyer.id === id_buyer);

    if (!buyerExists) {
      return ECardResponse.BuyerNotFound;
    }

    const card = {
      id: 1,
      card_holder_name,
      card_number,
      cvv,
      expiration_date,
      id_buyer,
    };

    this.cards.push(card);

    return card;
  }

  public async update(
    id: number,
    card_holder_name: string,
    cvv: string,
    expiration_date: Date
  ): Promise<Card | ECardResponse.CardNotFound> {
    const card = this.cards.find((card) => card.id === id);

    if (!card) {
      return ECardResponse.CardNotFound;
    }

    card.card_holder_name = card_holder_name;
    card.cvv = cvv;
    card.expiration_date = expiration_date;

    return card;
  }

  public async delete(id: number): Promise<Card | ECardResponse.CardNotFound> {
    const card = this.cards.find((card) => card.id === id);

    if (!card) {
      return ECardResponse.CardNotFound;
    }

    this.cards.pop();

    return card;
  }
}

export { InMemoryCardRepository };
