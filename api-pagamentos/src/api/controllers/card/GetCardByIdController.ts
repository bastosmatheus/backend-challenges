import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { GetCardByIdService } from "../../services/card/GetCardByIdService";

class GetCardByIdController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const cardRepository = new CardRepository();

    const getCardByIdService = new GetCardByIdService(cardRepository);

    const card = await getCardByIdService.execute(Number(id));

    if (card.isFailure()) {
      return res.status(card.value.statusCode).json({
        message: card.value.message,
        type: card.value.type,
        statusCode: card.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      card: card.value,
    });
  }
}

export { GetCardByIdController };
