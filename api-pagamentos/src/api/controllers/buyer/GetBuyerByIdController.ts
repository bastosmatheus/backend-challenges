import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { GetBuyerByIdService } from "../../services/buyer/GetBuyerByIdService";

class GetBuyerByIdController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const buyerRepository = new BuyerRepository();

    const getBuyerByIdService = new GetBuyerByIdService(buyerRepository);

    const buyer = await getBuyerByIdService.execute(Number(id));

    if (buyer.isFailure()) {
      return res.status(buyer.value.statusCode).json({
        message: buyer.value.message,
        type: buyer.value.type,
        statusCode: buyer.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      buyer: buyer.value,
    });
  }
}

export { GetBuyerByIdController };
