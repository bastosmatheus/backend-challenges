import { Request, Response } from "express";
import { BuyerRepository } from "../../repositories/BuyerRepository";
import { CreateBuyerService } from "../../services/buyer/CreateBuyerService";

class CreateBuyerController {
  public async execute(req: Request, res: Response) {
    const { buyer_name, cpf } = req.body;

    const buyerRepository = new BuyerRepository();

    const createBuyerService = new CreateBuyerService(buyerRepository);

    const buyer = await createBuyerService.execute(buyer_name, cpf);

    if (buyer.isFailure()) {
      return res.status(buyer.value.statusCode).json({
        message: buyer.value.message,
        type: buyer.value.type,
        statusCode: buyer.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "Comprador criado",
      type: "Created",
      statusCode: 201,
      buyer: buyer.value,
    });
  }
}

export { CreateBuyerController };
