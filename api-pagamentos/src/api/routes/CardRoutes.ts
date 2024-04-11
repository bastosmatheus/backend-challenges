import { Router } from "express";
import { CreateCardController } from "../controllers/card/CreateCardController";
import { GetAllCardsController } from "../controllers/card/GetAllCardsController";
import { GetCardByIdController } from "../controllers/card/GetCardByIdController";
import { GetCardsByBuyerController } from "../controllers/card/GetCardsByBuyerController";
import { DeleteCardController } from "../controllers/card/DeleteCardController";
import { UpdateCardController } from "../controllers/card/UpdateCardController";

class CardRoutes {
  private readonly router = Router();

  public async controllers() {
    const getAllCardsController = new GetAllCardsController();
    const getCardsByBuyerController = new GetCardsByBuyerController();
    const getCardByIdController = new GetCardByIdController();
    const createCardController = new CreateCardController();
    const updateCardController = new UpdateCardController();
    const deleteCardController = new DeleteCardController();

    return {
      getAllCardsController,
      getCardsByBuyerController,
      getCardByIdController,
      createCardController,
      updateCardController,
      deleteCardController,
    };
  }

  public async routes() {
    const {
      getAllCardsController,
      getCardsByBuyerController,
      getCardByIdController,
      createCardController,
      updateCardController,
      deleteCardController,
    } = await this.controllers();

    this.router.get("/cards", getAllCardsController.execute);
    this.router.get("/cards/buyer/:id_buyer", getCardsByBuyerController.execute);
    this.router.get("/cards/:id", getCardByIdController.execute);
    this.router.post("/cards", createCardController.execute);
    this.router.put("/cards/:id", updateCardController.execute);
    this.router.delete("/cards/:id", deleteCardController.execute);

    return this.router;
  }
}

export default new CardRoutes().routes();
