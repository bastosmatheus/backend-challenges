import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetPaymentsInfosByBuyerService } from "../../services/payment_infos/GetPaymentsInfosByBuyerService";

class GetPaymentsInfosByBuyerController {
  public async execute(req: Request, res: Response) {
    const { id_buyer } = req.params;

    const paymentInfosRepository = new PaymentInfosRepository();

    const getPaymentsInfosByBuyerService = new GetPaymentsInfosByBuyerService(
      paymentInfosRepository
    );

    const paymentsInfos = await getPaymentsInfosByBuyerService.execute(Number(id_buyer));

    if (paymentsInfos.isFailure()) {
      return res.status(paymentsInfos.value.statusCode).json({
        message: paymentsInfos.value.message,
        type: paymentsInfos.value.type,
        statusCode: paymentsInfos.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentsInfos: paymentsInfos.value,
    });
  }
}

export { GetPaymentsInfosByBuyerController };
