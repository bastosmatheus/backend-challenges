import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class GetPaymentsInfosByBuyerService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    id_buyer: number
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos[]>> {
    const paymentsInfosSchema = z.object({
      id_buyer: z
        .number({
          required_error: "O ID do comprador é obrigatório",
          invalid_type_error: "O ID do comprador deve ser um número",
        })
        .min(1, { message: "O ID do comprador não pode ser menor que 1" }),
    });

    const paymentsInfosValidation = paymentsInfosSchema.safeParse({ id_buyer });

    if (!paymentsInfosValidation.success) {
      const paymentsInfosError = paymentsInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentsInfosError.message));
    }

    const paymentsInfos = await this.paymentInfosRepository.getByBuyer(id_buyer);

    if (paymentsInfos === EPaymentInfosResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    return success(paymentsInfos);
  }
}

export { GetPaymentsInfosByBuyerService };
