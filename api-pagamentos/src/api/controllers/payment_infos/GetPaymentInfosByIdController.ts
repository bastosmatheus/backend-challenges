import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetPaymentInfosByIdService } from "../../services/payment_infos/GetPaymentInfosByIdService";

class GetPaymentInfosByIdController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const paymentInfosRepository = new PaymentInfosRepository();

    const getPaymentInfosByIdService = new GetPaymentInfosByIdService(paymentInfosRepository);

    const paymentInfos = await getPaymentInfosByIdService.execute(Number(id));

    if (paymentInfos.isFailure()) {
      return res.status(paymentInfos.value.statusCode).json({
        message: paymentInfos.value.message,
        type: paymentInfos.value.type,
        statusCode: paymentInfos.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentInfos: paymentInfos.value,
    });
  }
}

export { GetPaymentInfosByIdController };
