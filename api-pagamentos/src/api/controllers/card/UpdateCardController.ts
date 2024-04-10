import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { UpdateCardService } from "../../services/card/UpdateCardService";

class UpdateCardController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { card_holder_name, cvv, expiration_date } = req.body;

    const cardRepository = new CardRepository();

    const updateCardService = new UpdateCardService(cardRepository);

    const card = await updateCardService.execute(
      Number(id),
      card_holder_name,
      cvv,
      expiration_date
    );

    if (card.isFailure()) {
      return res.status(card.value.statusCode).json({
        message: card.value.message,
        type: card.value.type,
        statusCode: card.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Cartão atualizado",
      type: "OK",
      statusCode: 200,
      card: card.value,
    });
  }
}

export { UpdateCardController };
