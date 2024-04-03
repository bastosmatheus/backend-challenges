import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { Either, failure, success } from "../../errors/either";
import { EPaymentStatusResponse, PaymentStatus } from "../../interfaces/IPaymentStatusRepository";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";

class DeletePaymentStatusService {
  constructor(private paymentStatusRepository: PaymentStatusRepository) {}

  public async execute(
    id: number
  ): Promise<Either<NotFoundError | BadRequestError, PaymentStatus>> {
    const paymentStatusSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const paymentStatusValidation = paymentStatusSchema.safeParse({ id });

    if (!paymentStatusValidation.success) {
      const paymentStatusError = paymentStatusValidation.error.errors[0];

      return failure(new BadRequestError(paymentStatusError.message));
    }

    const paymentStatus = await this.paymentStatusRepository.delete(id);

    if (paymentStatus === EPaymentStatusResponse.PaymentStatusNotFound) {
      return failure(
        new NotFoundError("Nenhum status de pagamento foi encontrado com o ID: " + id)
      );
    }

    return success(paymentStatus);
  }
}

export { DeletePaymentStatusService };
