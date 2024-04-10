import { Router } from "express";
import { CreatePixController } from "../controllers/pix/CreatePixController";
import { GetAllPixsController } from "../controllers/pix/GetAllPixsController";
import { GetPixByIdController } from "../controllers/pix/GetPixByIdController";
import { GetPixsByBuyerController } from "../controllers/pix/GetPixsByBuyerController";

class PixRoutes {
  private readonly router = Router();

  public async controllers() {
    const getAllPixsController = new GetAllPixsController();
    const getPixsByBuyerController = new GetPixsByBuyerController();
    const getPixByIdController = new GetPixByIdController();
    const createPixController = new CreatePixController();

    return {
      getAllPixsController,
      getPixsByBuyerController,
      getPixByIdController,
      createPixController,
    };
  }

  public async routes() {
    const {
      getAllPixsController,
      getPixsByBuyerController,
      getPixByIdController,
      createPixController,
    } = await this.controllers();

    this.router.get("/pixs", getAllPixsController.execute);
    this.router.get("/pixs", getPixsByBuyerController.execute);
    this.router.get("/pixs/:id", getPixByIdController.execute);
    this.router.post("/pixs", createPixController.execute);

    return this.router;
  }
}

export default new PixRoutes().routes();
