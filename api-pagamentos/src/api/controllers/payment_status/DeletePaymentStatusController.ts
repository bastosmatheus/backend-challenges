import { Request, Response } from "express";
import { PaymentStatusRepository } from "../../repositories/PaymentStatusRepository";
import { DeletePaymentStatusService } from "../../services/payment_status/DeletePaymentStatusService";

class DeletePaymentStatusController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const paymentStatusRepository = new PaymentStatusRepository();

    const deletePaymentStatusService = new DeletePaymentStatusService(paymentStatusRepository);

    const paymentStatus = await deletePaymentStatusService.execute(Number(id));

    if (paymentStatus.isFailure()) {
      return res.status(paymentStatus.value.statusCode).json({
        message: paymentStatus.value.message,
        type: paymentStatus.value.type,
        statusCode: paymentStatus.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Status de pagamento deletado",
      type: "OK",
      statusCode: 200,
      paymentStatus: paymentStatus.value,
    });
  }
}

export { DeletePaymentStatusController };
