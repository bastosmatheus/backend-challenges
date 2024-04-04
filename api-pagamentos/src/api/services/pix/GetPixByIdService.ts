import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { PixRepository } from "../../repositories/PixRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { EPixResponse, Pix } from "../../interfaces/IPixRepository";
import { Either, failure, success } from "../../errors/either";

class GetPixByIdService {
  constructor(private pixRepository: PixRepository) {}

  public async execute(id: number): Promise<Either<NotFoundError | BadRequestError, Pix>> {
    const pixSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const pixValidation = pixSchema.safeParse({ id });

    if (!pixValidation.success) {
      const pixError = pixValidation.error.errors[0];

      return failure(new BadRequestError(pixError.message));
    }

    const pix = await this.pixRepository.getById(id);

    if (pix === EPixResponse.PixNotFound) {
      return failure(new NotFoundError("Nenhum código pix foi encontrado com o ID: " + id));
    }

    return success(pix);
  }
}

export { GetPixByIdService };
