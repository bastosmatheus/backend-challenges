import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { DeleteBuyerService } from "../../services/buyer/DeleteBuyerService";

class DeleteBuyerController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const buyerRepository = new BuyerRepository();

    const deleteBuyerService = new DeleteBuyerService(buyerRepository);

    const buyer = await deleteBuyerService.execute(Number(id));

    if (buyer.isFailure()) {
      return res.status(buyer.value.statusCode).json({
        message: buyer.value.message,
        type: buyer.value.type,
        statusCode: buyer.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Comprador deletado",
      type: "OK",
      statusCode: 200,
      buyer: buyer.value,
    });
  }
}

export { DeleteBuyerController };
