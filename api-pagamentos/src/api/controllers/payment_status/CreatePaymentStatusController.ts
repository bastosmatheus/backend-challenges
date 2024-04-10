import { Request, Response } from "express";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";
import { CreatePaymentStatusService } from "../../services/payment_status/CreatePaymentStatusService";

class CreatePaymentStatusController {
  public async execute(req: Request, res: Response) {
    const { name_status } = req.body;

    const paymentStatusRepository = new PaymentStatusRepository();

    const createPaymentStatusService = new CreatePaymentStatusService(paymentStatusRepository);

    const paymentStatus = await createPaymentStatusService.execute(name_status);

    if (paymentStatus.isFailure()) {
      return res.status(paymentStatus.value.statusCode).json({
        message: paymentStatus.value.message,
        type: paymentStatus.value.type,
        statusCode: paymentStatus.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "Status de pagamento criado",
      type: "Created",
      statusCode: 201,
      paymentStatus: paymentStatus.value,
    });
  }
}

export { CreatePaymentStatusController };
