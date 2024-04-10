import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { UpdatePaymentInfosService } from "../../services/payment_infos/UpdatePaymentInfosService";

class UpdatePaymentInfosController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { id_status } = req.body;

    const paymentInfosRepository = new PaymentInfosRepository();

    const updatePaymentInfosService = new UpdatePaymentInfosService(paymentInfosRepository);

    const paymentInfos = await updatePaymentInfosService.execute(Number(id), id_status);

    if (paymentInfos.isFailure()) {
      return res.status(paymentInfos.value.statusCode).json({
        message: paymentInfos.value.message,
        type: paymentInfos.value.type,
        statusCode: paymentInfos.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Informações do pagamento atualizadas",
      type: "OK",
      statusCode: 200,
      paymentInfos: paymentInfos.value,
    });
  }
}

export { UpdatePaymentInfosController };
