import { Router } from "express";
import { CreatePaymentInfosController } from "../controllers/payment_infos/CreatePaymentInfosController";
import { GetAllPaymentsInfosController } from "../controllers/payment_infos/GetAllPaymentsInfosController";
import { GetAllPaymentsInfosByPixsController } from "../controllers/payment_infos/GetAllPaymentsInfosByPixsController";
import { GetAllPaymentsInfosByCardsController } from "../controllers/payment_infos/GetAllPaymentsInfosByCardsController";
import { GetPaymentInfosByIdController } from "../controllers/payment_infos/GetPaymentInfosByIdController";
import { GetPaymentsInfosByStatusController } from "../controllers/payment_infos/GetPaymentsInfosByStatusController";
import { GetPaymentsInfosByCardController } from "../controllers/payment_infos/GetPaymentsInfosByCardController";
import { GetPaymentsInfosByPixController } from "../controllers/payment_infos/GetPaymentsInfosByPixController";
import { GetPaymentsInfosByBuyerController } from "../controllers/payment_infos/GetPaymentsInfosByBuyerController";
import { DeletePaymentInfosController } from "../controllers/payment_infos/DeletePaymentInfosController";
import { UpdatePaymentInfosController } from "../controllers/payment_infos/UpdatePaymentInfosController";

class PaymentInfosRoutes {
  private readonly router = Router();

  public async controllers() {
    const getAllPaymentsInfosController = new GetAllPaymentsInfosController();
    const getAllPaymentsInfosByPixsController = new GetAllPaymentsInfosByPixsController();
    const getAllPaymentsInfosByCardsController = new GetAllPaymentsInfosByCardsController();
    const getPaymentInfosByIdController = new GetPaymentInfosByIdController();
    const getPaymentsInfosByStatusController = new GetPaymentsInfosByStatusController();
    const getPaymentsInfosByBuyerController = new GetPaymentsInfosByBuyerController();
    const getPaymentsInfosByCardController = new GetPaymentsInfosByCardController();
    const getPaymentsInfosByPixController = new GetPaymentsInfosByPixController();
    const createPaymentInfosController = new CreatePaymentInfosController();
    const updatePaymentInfosController = new UpdatePaymentInfosController();
    const deletePaymentInfosController = new DeletePaymentInfosController();

    return {
      getAllPaymentsInfosController,
      getAllPaymentsInfosByPixsController,
      getAllPaymentsInfosByCardsController,
      getPaymentInfosByIdController,
      getPaymentsInfosByStatusController,
      getPaymentsInfosByBuyerController,
      getPaymentsInfosByCardController,
      getPaymentsInfosByPixController,
      createPaymentInfosController,
      updatePaymentInfosController,
      deletePaymentInfosController,
    };
  }

  public async routes() {
    const {
      getAllPaymentsInfosController,
      getAllPaymentsInfosByPixsController,
      getAllPaymentsInfosByCardsController,
      getPaymentInfosByIdController,
      getPaymentsInfosByStatusController,
      getPaymentsInfosByBuyerController,
      getPaymentsInfosByCardController,
      getPaymentsInfosByPixController,
      createPaymentInfosController,
      updatePaymentInfosController,
      deletePaymentInfosController,
    } = await this.controllers();

    this.router.get("/paymentsinfos", getAllPaymentsInfosController.execute);
    this.router.get("/paymentsinfos/pixs", getAllPaymentsInfosByPixsController.execute);
    this.router.get("/paymentsinfos/cards", getAllPaymentsInfosByCardsController.execute);
    this.router.get("/paymentsinfos/status/:id_status", getPaymentsInfosByStatusController.execute);
    this.router.get("/paymentsinfos/buyer/:id_buyer", getPaymentsInfosByBuyerController.execute);
    this.router.get("/paymentsinfos/card/:id_card", getPaymentsInfosByCardController.execute);
    this.router.get("/paymentsinfos/pix/:id_pix", getPaymentsInfosByPixController.execute);
    this.router.get("/paymentsinfos/:id", getPaymentInfosByIdController.execute);
    this.router.post("/paymentsinfos", createPaymentInfosController.execute);
    this.router.put("/paymentsinfos/:id", updatePaymentInfosController.execute);
    this.router.delete("/paymentsinfos/:id", deletePaymentInfosController.execute);

    return this.router;
  }
}

export default new PaymentInfosRoutes().routes();
