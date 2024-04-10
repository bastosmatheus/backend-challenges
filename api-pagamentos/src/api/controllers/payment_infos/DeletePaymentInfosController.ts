import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { DeletePaymentInfosService } from "../../services/payment_infos/DeletePaymentInfosService";

class DeletePaymentInfosController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const paymentInfosRepository = new PaymentInfosRepository();

    const deletePaymentInfosService = new DeletePaymentInfosService(paymentInfosRepository);

    const paymentInfos = await deletePaymentInfosService.execute(Number(id));

    if (paymentInfos.isFailure()) {
      return res.status(paymentInfos.value.statusCode).json({
        message: paymentInfos.value.message,
        type: paymentInfos.value.type,
        statusCode: paymentInfos.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Informações do pagamento deletadas",
      type: "OK",
      statusCode: 200,
      paymentInfos: paymentInfos.value,
    });
  }
}

export { DeletePaymentInfosController };
