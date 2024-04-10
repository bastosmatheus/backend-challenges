import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { GetAllPaymentsInfosByPixsService } from "../../services/payment_infos/GetAllPaymentsInfosByPixsService";

class GetAllPaymentsInfosByPixsController {
  public async execute(req: Request, res: Response) {
    const paymentInfosRepository = new PaymentInfosRepository();

    const getAllPaymentsInfosByPixsService = new GetAllPaymentsInfosByPixsService(
      paymentInfosRepository
    );

    const paymentsInfos = await getAllPaymentsInfosByPixsService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentsInfos,
    });
  }
}

export { GetAllPaymentsInfosByPixsController };
