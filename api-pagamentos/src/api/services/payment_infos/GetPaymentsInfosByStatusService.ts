import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class GetPaymentsInfosByStatusService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    id_status: number
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos[]>> {
    const paymentsInfosSchema = z.object({
      id_status: z
        .number({
          required_error: "O ID de status é obrigatório",
          invalid_type_error: "O ID de status deve ser um número",
        })
        .min(1, { message: "O ID de status não pode ser menor que 1" }),
    });

    const paymentsInfosValidation = paymentsInfosSchema.safeParse({ id_status });

    if (!paymentsInfosValidation.success) {
      const paymentsInfosError = paymentsInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentsInfosError.message));
    }

    const paymentsInfos = await this.paymentInfosRepository.getByStatus(id_status);

    if (paymentsInfos === EPaymentInfosResponse.PaymentStatusNotFound) {
      return failure(
        new NotFoundError("Nenhum status de pagamento foi encontrado com o ID: " + id_status)
      );
    }

    return success(paymentsInfos);
  }
}

export { GetPaymentsInfosByStatusService };
