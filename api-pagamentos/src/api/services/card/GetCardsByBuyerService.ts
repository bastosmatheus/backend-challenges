import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { CardRepository } from "../../repositories/CardRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Card, ECardResponse } from "../../interfaces/ICardRepository";
import { Either, failure, success } from "../../errors/either";

class GetCardsByBuyerService {
  constructor(private cardRepository: CardRepository) {}

  public async execute(id_buyer: number): Promise<Either<BadRequestError | NotFoundError, Card[]>> {
    const cardsSchema = z.object({
      id_buyer: z
        .number({
          required_error: "O ID do comprador é obrigatório",
          invalid_type_error: "O ID do comprador deve ser um número",
        })
        .min(1, { message: "O ID do comprador não pode ser menor que 1" }),
    });

    const cardsValidation = cardsSchema.safeParse({ id_buyer });

    if (!cardsValidation.success) {
      const cardsError = cardsValidation.error.errors[0];

      return failure(new BadRequestError(cardsError.message));
    }

    const cards = await this.cardRepository.getByBuyer(id_buyer);

    if (cards === ECardResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    return success(cards);
  }
}

export { GetCardsByBuyerService };
