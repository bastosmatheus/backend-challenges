import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetAllPaymentsInfosByCardsService } from "../../services/payment_infos/GetAllPaymentsInfosByCardsService";

class GetAllPaymentsInfosByCardsController {
  public async execute(req: Request, res: Response) {
    const paymentInfosRepository = new PaymentInfosRepository();

    const getAllPaymentsInfosByCardsService = new GetAllPaymentsInfosByCardsService(
      paymentInfosRepository
    );

    const paymentsInfos = await getAllPaymentsInfosByCardsService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentsInfos,
    });
  }
}

export { GetAllPaymentsInfosByCardsController };
