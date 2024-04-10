import { Request, Response } from "express";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";
import { GetPaymentStatusByIdService } from "../../services/payment_status/GetPaymentStatusByIdService";

class GetPaymentStatusByIdController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const paymentStatusRepository = new PaymentStatusRepository();

    const getPaymentStatusByIdService = new GetPaymentStatusByIdService(paymentStatusRepository);

    const paymentStatus = await getPaymentStatusByIdService.execute(Number(id));

    if (paymentStatus.isFailure()) {
      return res.status(paymentStatus.value.statusCode).json({
        message: paymentStatus.value.message,
        type: paymentStatus.value.type,
        statusCode: paymentStatus.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      paymentStatus: paymentStatus.value,
    });
  }
}

export { GetPaymentStatusByIdController };
