import { z } from "zod";
import { ConflictError } from "../../errors/ConflictError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentStatusResponse, PaymentStatus } from "../../interfaces/IPaymentStatusRepository";

class CreatePaymentStatusService {
  constructor(private paymentStatusRepository: PaymentStatusRepository) {}

  public async execute(name_status: string): Promise<Either<BadRequestError, PaymentStatus>> {
    const paymentStatusSchema = z.object({
      name_status: z.enum(["Aguardando Pagamento", "Pago", "Cancelado"], {
        errorMap: (status, ctx) => {
          if (status.code === "invalid_enum_value") {
            return {
              message: "Informe um tipo válido de status: aguardando pagamento, pago ou cancelado",
            };
          }

          if (status.code === "invalid_type" && status.received === "undefined") {
            return {
              message: "Informe o status do pagamento",
            };
          }

          if (status.code === "invalid_type" && status.received !== "string") {
            return {
              message: "O status do pagamento deve ser uma string",
            };
          }
        },
      }),
    });

    const paymentStatusValidation = paymentStatusSchema.safeParse({
      name_status,
    });

    if (!paymentStatusValidation.success) {
      const paymentStatusError = paymentStatusValidation.error.errors[0];

      return failure(new BadRequestError(paymentStatusError.message));
    }

    const paymentStatus = await this.paymentStatusRepository.create(name_status);

    if (paymentStatus === EPaymentStatusResponse.NameStatusAlreadyExists) {
      return failure(new ConflictError("Esse status já existe"));
    }

    return success(paymentStatus);
  }
}

export { CreatePaymentStatusService };
