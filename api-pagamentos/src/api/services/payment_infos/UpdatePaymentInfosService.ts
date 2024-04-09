import { z } from "zod";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";

class UpdatePaymentInfosService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    id: number,
    id_status: number
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos>> {
    const paymentInfosSchema = z.object({
      id: z.number({
        required_error: "O ID é obrigatório",
        invalid_type_error: "O ID deve ser um número",
      }),
      id_status: z.number({
        required_error: "O ID de status é obrigatório",
        invalid_type_error: "O ID de status deve ser um número",
      }),
    });

    const paymentInfosValidation = paymentInfosSchema.safeParse({ id, id_status });

    if (!paymentInfosValidation.success) {
      const paymentInfosError = paymentInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentInfosError.message));
    }

    const paymentInfos = await this.paymentInfosRepository.update(id, id_status);

    if (paymentInfos === EPaymentInfosResponse.PaymentInfosNotFound) {
      return failure(
        new NotFoundError("Nenhuma informação de pagamento foi encontrada com o ID: " + id)
      );
    }

    if (paymentInfos === EPaymentInfosResponse.PaymentStatusNotFound) {
      return failure(
        new NotFoundError("Nenhum status de pagamento foi encontrado com o ID: " + id_status)
      );
    }

    return success(paymentInfos);
  }
}

export { UpdatePaymentInfosService };
