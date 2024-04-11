import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetPaymentsInfosByPixService } from "../../services/payment_infos/GetPaymentsInfosByPixService";

class GetPaymentsInfosByPixController {
  public async execute(req: Request, res: Response) {
    const { id_pix } = req.params;

    const paymentInfosRepository = new PaymentInfosRepository();

    const getPaymentsInfosByPixService = new GetPaymentsInfosByPixService(paymentInfosRepository);

    const paymentsInfos = await getPaymentsInfosByPixService.execute(Number(id_pix));

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

export { GetPaymentsInfosByPixController };
