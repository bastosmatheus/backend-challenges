type Card = {
  id: number;
  card_holder_name: string;
  card_number: string;
  cvv: string;
  expiration_date: Date;
  id_buyer: number;
};

enum ECardResponse {
  CardNotFound,
  BuyerNotFound,
  CardNumberAlreadyExists,
}

interface ICardRepository {
  getAll(): Promise<Card[]>;
  getById(id: number): Promise<Card | ECardResponse.CardNotFound>;
  getByBuyer(id_buyer: number): Promise<Card[] | ECardResponse.BuyerNotFound>;
  create(
    card_holder_name: string,
    card_number: string,
    cvv: string,
    expiration_date: Date,
    id_buyer: number
  ): Promise<Card | ECardResponse.CardNumberAlreadyExists | ECardResponse.BuyerNotFound>;
  update(
    id: number,
    card_holder_name: string,
    cvv: string,
    expiration_date: Date
  ): Promise<Card | ECardResponse.CardNotFound>;
  delete(id: number): Promise<Card | ECardResponse.CardNotFound>;
}

export { ICardRepository, ECardResponse, Card };
