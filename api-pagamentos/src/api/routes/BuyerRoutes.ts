import { Router } from "express";
import { CreateBuyerController } from "../controllers/buyer/CreateBuyerController";
import { GetAllBuyersController } from "../controllers/buyer/GetAllBuyersController";
import { GetBuyerByIdController } from "../controllers/buyer/GetBuyerByIdController";
import { GetBuyerByCpfController } from "../controllers/buyer/GetBuyerByCpfController";
import { DeleteBuyerController } from "../controllers/buyer/DeleteBuyerController";
import { UpdateBuyerController } from "../controllers/buyer/UpdateBuyerController";

class BuyerRoutes {
  private readonly router = Router();

  public async controllers() {
    const getAllBuyersController = new GetAllBuyersController();
    const getBuyerByIdController = new GetBuyerByIdController();
    const getBuyerByCpfController = new GetBuyerByCpfController();
    const createBuyerController = new CreateBuyerController();
    const updateBuyerController = new UpdateBuyerController();
    const deleteBuyerController = new DeleteBuyerController();

    return {
      getAllBuyersController,
      getBuyerByIdController,
      getBuyerByCpfController,
      createBuyerController,
      updateBuyerController,
      deleteBuyerController,
    };
  }

  public async routes() {
    const {
      getAllBuyersController,
      getBuyerByIdController,
      getBuyerByCpfController,
      createBuyerController,
      updateBuyerController,
      deleteBuyerController,
    } = await this.controllers();

    this.router.get("/buyers", getAllBuyersController.execute);
    this.router.get("/buyers/:id", getBuyerByIdController.execute);
    this.router.get("/buyers/cpf/:cpf", getBuyerByCpfController.execute);
    this.router.post("/buyers", createBuyerController.execute);
    this.router.put("/buyers/:id", updateBuyerController.execute);
    this.router.delete("/buyers/:id", deleteBuyerController.execute);

    return this.router;
  }
}

export default new BuyerRoutes().routes();
