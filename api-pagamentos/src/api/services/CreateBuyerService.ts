import { z } from "zod";
import { ConflictError } from "../errors/ConflictError";
import { BadRequestError } from "../errors/BadRequestError";
import { BuyerRepository } from "../repositories/BuyerRepository";
import { Buyer, EBuyerResponse } from "../interfaces/IBuyerRepository";
import { Either, failure, success } from "../errors/either";

class CreateBuyerService {
  constructor(private buyerRepository: BuyerRepository) {}

  public async execute(
    name: string,
    cpf: string
  ): Promise<Either<ConflictError | BadRequestError, Buyer>> {
    const buyerSchema = z.object({
      name: z
        .string({
          required_error: "Informe o nome do comprador",
          invalid_type_error: "O nome do comprador deve ser uma string",
        })
        .min(2, { message: "O nome do comprador deve ter pelo menos 2 caracteres" }),
      cpf: z
        .string({
          required_error: "Informe o CPF do comprador",
          invalid_type_error: "O CPF do comprador deve ser uma string",
        })
        .length(11, { message: "O CPF do comprador deve ter 11 dígitos" }),
    });

    const buyerValidation = buyerSchema.safeParse({ name, cpf });

    if (!buyerValidation.success) {
      const buyerError = buyerValidation.error.errors[0];

      return failure(new BadRequestError(buyerError.message));
    }

    const buyer = await this.buyerRepository.create(name, cpf);

    if (buyer === EBuyerResponse.CPFAlreadyExists) {
      return failure(new ConflictError("Esse CPF já foi cadastrado"));
    }

    return success(buyer);
  }
}

export { CreateBuyerService };
