import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { GetBuyerByCpfService } from "../../services/buyer/GetBuyerByCpfService";

class GetBuyerByCpfController {
  public async execute(req: Request, res: Response) {
    const { cpf } = req.params;

    const buyerRepository = new BuyerRepository();

    const getBuyerByCpfService = new GetBuyerByCpfService(buyerRepository);

    const buyer = await getBuyerByCpfService.execute(cpf);

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

export { GetBuyerByCpfController };
