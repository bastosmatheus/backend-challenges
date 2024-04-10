import { Request, Response } from "express";
import { PaymentInfosRepository } from "../../repositories/PaymentInfosRepository";
import { CreatePaymentInfosService } from "../../services/payment_infos/CreatePaymentInfosService";

class CreatePaymentInfosController {
  public async execute(req: Request, res: Response) {
    const { price, id_status, id_buyer, id_card, id_pix } = req.body;

    const paymentInfosRepository = new PaymentInfosRepository();

    const createPaymentInfosService = new CreatePaymentInfosService(paymentInfosRepository);

    const paymentInfos = await createPaymentInfosService.execute(
      price,
      id_status,
      id_buyer,
      id_card,
      id_pix
    );

    if (paymentInfos.isFailure()) {
      return res.status(paymentInfos.value.statusCode).json({
        message: paymentInfos.value.message,
        type: paymentInfos.value.type,
        statusCode: paymentInfos.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "Informações do pagamento criadas",
      type: "Created",
      statusCode: 201,
      paymentInfos: paymentInfos.value,
    });
  }
}

export { CreatePaymentInfosController };
