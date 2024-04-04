import { Card } from "../../interfaces/ICardRepository";
import { CardRepository } from "../../repositories/CardRepository";

class GetAllCardsService {
  constructor(private CardRepository: CardRepository) {}

  public async execute(): Promise<Card[]> {
    const cards = await this.CardRepository.getAll();

    return cards;
  }
}

export { GetAllCardsService };
