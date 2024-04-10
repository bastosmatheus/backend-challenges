import { Request, Response } from "express";
import { CardRepository } from "../../repositories/CardRepository";
import { CreateCardService } from "../../services/card/CreateCardService";

class CreateCardController {
  public async execute(req: Request, res: Response) {
    const { card_holder_name, card_number, cvv, expiration_date, id_buyer } = req.body;

    const cardRepository = new CardRepository();

    const createCardService = new CreateCardService(cardRepository);

    const card = await createCardService.execute(
      card_holder_name,
      card_number,
      cvv,
      expiration_date,
      id_buyer
    );

    if (card.isFailure()) {
      return res.status(card.value.statusCode).json({
        message: card.value.message,
        type: card.value.type,
        statusCode: card.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "Cartão criado",
      type: "OK",
      statusCode: 201,
      card: card.value,
    });
  }
}

export { CreateCardController };
