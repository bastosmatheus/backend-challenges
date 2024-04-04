import { z } from "zod";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { Either, failure, success } from "../../errors/either";
import { Card, ECardResponse } from "../../interfaces/ICardRepository";
import { CardRepository } from "../../repositories/CardRepository";

class UpdateCardService {
  constructor(private cardRepository: CardRepository) {}

  public async execute(
    id: number,
    card_holder_name: string,
    cvv: string,
    expiration_date: Date
  ): Promise<Either<NotFoundError | BadRequestError, Card>> {
    const cardSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
      card_holder_name: z
        .string({
          required_error: "Informe o titular do cartão",
          invalid_type_error: "O nome do titular deve ser uma string",
        })
        .min(2, { message: "O nome do titular deve ter pelo menos 2 caracteres" }),
      cvv: z
        .string({
          required_error: "Informe o CVV do cartão",
          invalid_type_error: "O CVV do cartão deve ser uma string",
        })
        .length(3, { message: "O CVV deve ter 3 dígitos" }),
      expiration_date: z.date({
        required_error: "Informe a data de expiração do cartão",
        invalid_type_error: "A data de expiração do cartão deve ser uma data",
      }),
    });

    const cardValidation = cardSchema.safeParse({
      id,
      card_holder_name,
      cvv,
      expiration_date,
    });

    if (!cardValidation.success) {
      const cardError = cardValidation.error.errors[0];

      return failure(new BadRequestError(cardError.message));
    }

    const card = await this.cardRepository.update(id, card_holder_name, cvv, expiration_date);

    if (card === ECardResponse.CardNotFound) {
      return failure(new NotFoundError("Nenhum cartão foi encontrado com o ID: " + id));
    }

    return success(card);
  }
}

export { UpdateCardService };
