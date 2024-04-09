import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class GetPaymentInfosByIdService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(id: number): Promise<Either<BadRequestError | NotFoundError, PaymentInfos>> {
    const paymentInfosSchema = z.object({
      id: z
        .number({
          required_error: "O ID é obrigatório",
          invalid_type_error: "O ID deve ser um número",
        })
        .min(1, { message: "O ID não pode ser menor que 1" }),
    });

    const paymentInfosValidation = paymentInfosSchema.safeParse({ id });

    if (!paymentInfosValidation.success) {
      const paymentInfosError = paymentInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentInfosError.message));
    }

    const paymentInfos = await this.paymentInfosRepository.getById(id);

    if (paymentInfos === EPaymentInfosResponse.PaymentInfosNotFound) {
      return failure(
        new NotFoundError("Nenhuma informação de pagamento foi encontrada com o ID: " + id)
      );
    }

    return success(paymentInfos);
  }
}

export { GetPaymentInfosByIdService };
