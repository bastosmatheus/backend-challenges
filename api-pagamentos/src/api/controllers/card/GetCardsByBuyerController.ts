import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { GetCardsByBuyerService } from "../../services/card/GetCardsByBuyerService";

class GetCardsByBuyerController {
  public async execute(req: Request, res: Response) {
    const { id_buyer } = req.params;

    const cardRepository = new CardRepository();

    const getCardsByBuyerService = new GetCardsByBuyerService(cardRepository);

    const cards = await getCardsByBuyerService.execute(Number(id_buyer));

    if (cards.isFailure()) {
      return res.status(cards.value.statusCode).json({
        message: cards.value.message,
        type: cards.value.type,
        statusCode: cards.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      cards: cards.value,
    });
  }
}

export { GetCardsByBuyerController };
