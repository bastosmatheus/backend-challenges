import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { ConflictError } from "../../errors/ConflictError";
import { CardRepository } from "../../repositories/CardRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Card, ECardResponse } from "../../interfaces/ICardRepository";
import { Either, failure, success } from "../../errors/either";

class CreateCardService {
  constructor(private cardRepository: CardRepository) {}

  public async execute(
    card_holder_name: string,
    card_number: string,
    cvv: string,
    expiration_date: Date,
    id_buyer: number
  ): Promise<Either<BadRequestError | ConflictError | NotFoundError, Card>> {
    const cardSchema = z.object({
      card_holder_name: z
        .string({
          required_error: "Informe o titular do cartão",
          invalid_type_error: "O nome do titular deve ser uma string",
        })
        .min(2, { message: "O nome do titular deve ter pelo menos 2 caracteres" }),
      card_number: z
        .string({
          required_error: "Informe o número do cartão",
          invalid_type_error: "O número do cartão deve ser uma string",
        })
        .min(14, { message: "O número do cartão deve ter no mínimo 14 dígitos" })
        .max(16, { message: "O número do cartão deve ter no máximo 16 dígitos" }),
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
      id_buyer: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const cardValidation = cardSchema.safeParse({
      card_holder_name,
      card_number,
      cvv,
      expiration_date,
      id_buyer,
    });

    if (!cardValidation.success) {
      const cardError = cardValidation.error.errors[0];

      return failure(new BadRequestError(cardError.message));
    }

    const card = await this.cardRepository.create(
      card_holder_name,
      card_number,
      cvv,
      expiration_date,
      id_buyer
    );

    if (card === ECardResponse.CardNumberAlreadyExists) {
      return failure(new ConflictError("Esse número de cartão já existe"));
    }

    if (card === ECardResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    return success(card);
  }
}

export { CreateCardService };
