import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { GetAllCardsService } from "../../services/card/GetAllCardsService";

class GetAllCardsController {
  public async execute(req: Request, res: Response) {
    const cardRepository = new CardRepository();

    const getAllCardsService = new GetAllCardsService(cardRepository);

    const cards = await getAllCardsService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      cards,
    });
  }
}

export { GetAllCardsController };
