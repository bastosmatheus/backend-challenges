import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetPaymentsInfosByCardService } from "../../services/payment_infos/GetPaymentsInfosByCardService";

class GetPaymentsInfosByCardController {
  public async execute(req: Request, res: Response) {
    const { id_card } = req.query;

    const paymentInfosRepository = new PaymentInfosRepository();

    const getPaymentsInfosByCardService = new GetPaymentsInfosByCardService(paymentInfosRepository);

    const paymentsInfos = await getPaymentsInfosByCardService.execute(Number(id_card));

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

export { GetPaymentsInfosByCardController };
