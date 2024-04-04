import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { CardRepository } from "../../repositories/CardRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { ECardResponse, Card } from "../../interfaces/ICardRepository";
import { Either, failure, success } from "../../errors/either";

class DeleteCardService {
  constructor(private cardRepository: CardRepository) {}

  public async execute(id: number): Promise<Either<NotFoundError | BadRequestError, Card>> {
    const cardSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const cardValidation = cardSchema.safeParse({ id });

    if (!cardValidation.success) {
      const CardError = cardValidation.error.errors[0];

      return failure(new BadRequestError(CardError.message));
    }

    const Card = await this.cardRepository.delete(id);

    if (Card === ECardResponse.CardNotFound) {
      return failure(new NotFoundError("Nenhum cartão foi encontrado com o ID: " + id));
    }

    return success(Card);
  }
}

export { DeleteCardService };
