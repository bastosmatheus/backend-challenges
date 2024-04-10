import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetAllPaymentsInfosService } from "../../services/payment_infos/GetAllPaymentsInfosService";

class GetAllPaymentsInfosController {
  public async execute(req: Request, res: Response) {
    const paymentInfosRepository = new PaymentInfosRepository();

    const getAllPaymentsInfosService = new GetAllPaymentsInfosService(paymentInfosRepository);

    const paymentsInfos = await getAllPaymentsInfosService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentsInfos,
    });
  }
}

export { GetAllPaymentsInfosController };
