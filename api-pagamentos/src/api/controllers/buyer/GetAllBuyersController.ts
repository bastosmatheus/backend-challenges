import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { GetAllBuyersService } from "../../services/buyer/GetAllBuyersService";

class GetAllBuyersController {
  public async execute(req: Request, res: Response) {
    const buyerRepository = new BuyerRepository();

    const getallBuyersService = new GetAllBuyersService(buyerRepository);

    const buyers = await getallBuyersService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      buyers,
    });
  }
}

export { GetAllBuyersController };
