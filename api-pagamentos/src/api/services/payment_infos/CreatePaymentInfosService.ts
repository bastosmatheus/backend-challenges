import { z } from "zod";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { Either, failure, success } from "../../errors/either";
import { EPaymentInfosResponse, PaymentInfos } from "../../interfaces/IPaymentInfosRepository";

class CreatePaymentInfosService {
  constructor(private paymentInfosRepository: PaymentInfosRepository) {}

  public async execute(
    price: number,
    id_status: number,
    id_buyer: number,
    id_card: number | null,
    id_pix: number | null
  ): Promise<Either<BadRequestError | NotFoundError, PaymentInfos>> {
    const paymentInfosSchema = z.object({
      price: z
        .number({
          required_error: "O preço do pagamento é obrigatório",
          invalid_type_error: "O preço do pagamento deve ser um número",
        })
        .min(0.05, { message: "O preço do pagamento não pode ser menor que R$0.05" }),
      id_status: z
        .number({
          required_error: "O ID de status é obrigatório",
          invalid_type_error: "O ID de status deve ser um número",
        })
        .min(1, { message: "O ID de status não pode ser menor que 1" }),
      id_buyer: z
        .number({
          required_error: "O ID do comprador é obrigatório",
          invalid_type_error: "O ID do comprador deve ser um número",
        })
        .min(1, { message: "O ID do comprador não pode ser menor que 1" }),
      id_card: z.union([
        z.null({
          required_error: "O ID do cartão é obrigatório",
          invalid_type_error: "O ID do cartão deve ser um número ou nulo",
        }),
        z
          .number({
            required_error: "O ID do cartão é obrigatório",
            invalid_type_error: "O ID do cartão deve ser um número ou nulo",
          })
          .min(1, { message: "O ID do cartão não pode ser menor que 1" }),
      ]),
      id_pix: z.union([
        z.null({
          required_error: "O ID do cartão é obrigatório",
          invalid_type_error: "O ID do cartão deve ser um número ou nulo",
        }),
        z
          .number({
            required_error: "O ID do cartão é obrigatório",
            invalid_type_error: "O ID do cartão deve ser um número ou nulo",
          })
          .min(1, { message: "O ID do cartão não pode ser menor que 1" }),
      ]),
    });

    const paymentInfosValidation = paymentInfosSchema.safeParse({
      price,
      id_status,
      id_buyer,
      id_card,
      id_pix,
    });

    if (!paymentInfosValidation.success) {
      const paymentInfosError = paymentInfosValidation.error.errors[0];

      return failure(new BadRequestError(paymentInfosError.message));
    }

    const paymentInfos = await this.paymentInfosRepository.create(
      price,
      id_status,
      id_buyer,
      id_card,
      id_pix
    );

    if (paymentInfos === EPaymentInfosResponse.PaymentStatusNotFound) {
      return failure(
        new NotFoundError("Nenhum status de pagamento foi encontrado com o ID: " + id_status)
      );
    }

    if (paymentInfos === EPaymentInfosResponse.BuyerNotFound) {
      return failure(new NotFoundError("Nenhum comprador foi encontrado com o ID: " + id_buyer));
    }

    if (paymentInfos === EPaymentInfosResponse.CardNotFound) {
      return failure(new NotFoundError("Nenhum cartão foi encontrado com o ID: " + id_card));
    }

    if (paymentInfos === EPaymentInfosResponse.PixNotFound) {
      return failure(new NotFoundError("Nenhum pix foi encontrado com o ID: " + id_pix));
    }

    if (paymentInfos === EPaymentInfosResponse.NoLinkWithCardOrPix) {
      return failure(
        new BadRequestError(
          "Pix ou cartão devem ser referenciados, não há a possibilidade de os dois serem nulos"
        )
      );
    }

    if (paymentInfos === EPaymentInfosResponse.ReferenceOnlyForOneCardOrPix) {
      return failure(new BadRequestError("A referencia só é valida para um: ou cartão ou pix"));
    }

    return success(paymentInfos);
  }
}

export { CreatePaymentInfosService };
