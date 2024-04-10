import { Request, Response } from "express";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";
import { GetAllPaymentsStatusService } from "../../services/payment_status/GetAllPaymentsStatusService";

class GetAllPaymentsStatusController {
  public async execute(req: Request, res: Response) {
    const paymentStatusRepository = new PaymentStatusRepository();

    const getAllPaymentsStatusService = new GetAllPaymentsStatusService(paymentStatusRepository);

    const paymentsStatus = await getAllPaymentsStatusService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentsStatus,
    });
  }
}

export { GetAllPaymentsStatusController };
