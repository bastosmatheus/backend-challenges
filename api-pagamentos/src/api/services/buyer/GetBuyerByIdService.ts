import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Buyer, EBuyerResponse } from "../../interfaces/IBuyerRepository";
import { Either, failure, success } from "../../errors/either";

class GetBuyerByIdService {
  constructor(private buyerRepository: BuyerRepository) {}

  public async execute(id: number): Promise<Either<NotFoundError | BadRequestError, Buyer>> {
    const buyerSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const buyerValidation = buyerSchema.safeParse({ id });

    if (!buyerValidation.success) {
      const buyerError = buyerValidation.error.errors[0];

      return failure(new BadRequestError(buyerError.message));
    }

    const buyer = await this.buyerRepository.getById(id);

    if (buyer === EBuyerResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id));
    }

    return success(buyer);
  }
}

export { GetBuyerByIdService };
