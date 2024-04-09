import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class GetPaymentsInfosByPixService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    id_pix: number
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos[]>> {
    const paymentsInfosSchema = z.object({
      id_pix: z
        .number({
          required_error: "O ID do pix é obrigatório",
          invalid_type_error: "O ID do pix deve ser um número",
        })
        .min(1, { message: "O ID do pix não pode ser menor que 1" }),
    });

    const paymentsInfosValidation = paymentsInfosSchema.safeParse({ id_pix });

    if (!paymentsInfosValidation.success) {
      const paymentsInfosError = paymentsInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentsInfosError.message));
    }

    const paymentsInfos = await this.paymentInfosRepository.getByPix(id_pix);

    if (paymentsInfos === EPaymentInfosResponse.PixNotFound) {
      return failure(new NotFoundError("Nenhum pix foi encontrado com o ID: " + id_pix));
    }

    return success(paymentsInfos);
  }
}

export { GetPaymentsInfosByPixService };
