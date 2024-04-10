import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetPaymentsInfosByStatusService } from "../../services/payment_infos/GetPaymentsInfosByStatusService";

class GetPaymentsInfosByStatusController {
  public async execute(req: Request, res: Response) {
    const { id_status } = req.query;

    const paymentInfosRepository = new PaymentInfosRepository();

    const getPaymentsInfosByStatusService = new GetPaymentsInfosByStatusService(
      paymentInfosRepository
    );

    const paymentsInfos = await getPaymentsInfosByStatusService.execute(Number(id_status));

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

export { GetPaymentsInfosByStatusController };
