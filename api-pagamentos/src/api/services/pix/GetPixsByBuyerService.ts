import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { PixRepository } from "../../repositories/PixRepository";
import { BadRequestError } from "../../errors/BadRequestError";
import { Pix, EPixResponse } from "../../interfaces/IPixRepository";
import { Either, failure, success } from "../../errors/either";

class GetPixsByBuyerService {
  constructor(private pixRepository: PixRepository) {}

  public async execute(id_buyer: number): Promise<Either<BadRequestError | NotFoundError, Pix[]>> {
    const pixsSchema = z.object({
      id_buyer: z
        .number({
          required_error: "O ID do comprador é obrigatório",
          invalid_type_error: "O ID do comprador deve ser um número",
        })
        .min(1, { message: "O ID do comprador não pode ser menor que 1" }),
    });

    const pixsValidation = pixsSchema.safeParse({ id_buyer });

    if (!pixsValidation.success) {
      const pixsError = pixsValidation.error.errors[0];

      return failure(new BadRequestError(pixsError.message));
    }

    const pixs = await this.pixRepository.getByBuyer(id_buyer);

    if (pixs === EPixResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    return success(pixs);
  }
}

export { GetPixsByBuyerService };
