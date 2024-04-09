import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class GetPaymentsInfosByCardService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    id_card: number
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos[]>> {
    const paymentsInfosSchema = z.object({
      id_card: z
        .number({
          required_error: "O ID do cartão é obrigatório",
          invalid_type_error: "O ID do cartão deve ser um número",
        })
        .min(1, { message: "O ID do cartão não pode ser menor que 1" }),
    });

    const paymentsInfosValidation = paymentsInfosSchema.safeParse({ id_card });

    if (!paymentsInfosValidation.success) {
      const paymentsInfosError = paymentsInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentsInfosError.message));
    }

    const paymentsInfos = await this.paymentInfosRepository.getByCard(id_card);

    if (paymentsInfos === EPaymentInfosResponse.CardNotFound) {
      return failure(new NotFoundError("Nenhum cartão foi encontrado com o ID: " + id_card));
    }

    return success(paymentsInfos);
  }
}

export { GetPaymentsInfosByCardService };
