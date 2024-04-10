import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { DeleteCardService } from "../../services/card/DeleteCardService";

class DeleteCardController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const cardRepository = new CardRepository();

    const deleteCardService = new DeleteCardService(cardRepository);

    const card = await deleteCardService.execute(Number(id));

    if (card.isFailure()) {
      return res.status(card.value.statusCode).json({
        message: card.value.message,
        type: card.value.type,
        statusCode: card.value.statusCode,
      });
    }

    return res.status(200).json({
      message: "Cartão deletado",
      type: "OK",
      statusCode: 200,
      card: card.value,
    });
  }
}

export { DeleteCardController };
