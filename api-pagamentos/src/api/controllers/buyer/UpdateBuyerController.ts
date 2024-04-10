import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { UpdateBuyerService } from "../../services/buyer/UpdateBuyerService";

class UpdateBuyerController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { buyer_name } = req.body;

    const buyerRepository = new BuyerRepository();

    const updateBuyerService = new UpdateBuyerService(buyerRepository);

    const buyer = await updateBuyerService.execute(Number(id), buyer_name);

    if (buyer.isFailure()) {
      return res.status(buyer.value.statusCode).json({
        message: buyer.value.message,
        type: buyer.value.type,
        statusCode: buyer.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Comprador atualizado",
      type: "OK",
      statusCode: 200,
      buyer: buyer.value,
    });
  }
}

export { UpdateBuyerController };
