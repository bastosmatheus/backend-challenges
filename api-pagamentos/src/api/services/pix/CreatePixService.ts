import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { ConflictError } from "../../errors/ConflictError";
import { PixRepository } from "../../repositories/PixRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Pix, EPixResponse } from "../../interfaces/IPixRepository";
import { Either, failure, success } from "../../errors/either";

class CreatePixService {
  constructor(private pixRepository: PixRepository) {}

  public async execute(
    code_generated: string,
    id_buyer: number
  ): Promise<Either<BadRequestError | ConflictError | NotFoundError, Pix>> {
    const pixSchema = z.object({
      code_generated: z
        .string({
          required_error: "Informe o código pix",
          invalid_type_error: "O código pix deve ser uma string",
        })
        .min(50, { message: "O código pix deve ter no minimo 50 caracteres" }),
      id_buyer: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const pixValidation = pixSchema.safeParse({
      code_generated,
      id_buyer,
    });

    if (!pixValidation.success) {
      const pixError = pixValidation.error.errors[0];

      return failure(new BadRequestError(pixError.message));
    }

    const pix = await this.pixRepository.create(code_generated, id_buyer);

    if (pix === EPixResponse.CodeAlreadyExists) {
      return failure(new ConflictError("Esse código pix já existe"));
    }

    if (pix === EPixResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    return success(pix);
  }
}

export { CreatePixService };
