import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { Buyer, EBuyerResponse } from "../../interfaces/IBuyerRepository";
import { Either, failure, success } from "../../errors/either";

class UpdateBuyerService {
  constructor(private buyerRepository: BuyerRepository) {}

  public async execute(
    id: number,
    buyer_name: string
  ): Promise<Either<NotFoundError | BadRequestError, Buyer>> {
    const buyerSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
      buyer_name: z
        .string({
          required_error: "Informe o nome do comprador",
          invalid_type_error: "O nome do comprador deve ser uma string",
        })
        .min(2, { message: "O nome do comprador deve ter pelo menos 2 caracteres" }),
    });

    const buyerValidation = buyerSchema.safeParse({ id, buyer_name });

    if (!buyerValidation.success) {
      const buyerError = buyerValidation.error.errors[0];

      return failure(new BadRequestError(buyerError.message));
    }

    const buyer = await this.buyerRepository.update(id, buyer_name);

    if (buyer === EBuyerResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id));
    }

    return success(buyer);
  }
}

export { UpdateBuyerService };
