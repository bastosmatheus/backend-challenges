import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Buyer, EBuyerResponse } from "../../interfaces/IBuyerRepository";
import { Either, failure, success } from "../../errors/either";

class GetBuyerByCpfService {
  constructor(private buyerRepository: BuyerRepository) {}

  public async execute(cpf: string): Promise<Either<NotFoundError | BadRequestError, Buyer>> {
    const buyerSchema = z.object({
      cpf: z
        .string({
          required_error: "Informe o CPF do comprador",
          invalid_type_error: "O CPF do comprador deve ser uma string",
        })
        .length(11, { message: "O CPF do comprador deve ter 11 dígitos" }),
    });

    const buyerValidation = buyerSchema.safeParse({ cpf });

    if (!buyerValidation.success) {
      const buyerError = buyerValidation.error.errors[0];

      return failure(new BadRequestError(buyerError.message));
    }

    const buyer = await this.buyerRepository.getByCpf(cpf);

    if (buyer === EBuyerResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o CPF: " + cpf));
    }

    return success(buyer);
  }
}

export { GetBuyerByCpfService };
