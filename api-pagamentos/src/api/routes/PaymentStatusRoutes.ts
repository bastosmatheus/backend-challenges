import { Router } from "express";
import { CreatePaymentStatusController } from "../controllers/payment_status/CreatePaymentStatusController";
import { GetAllPaymentsStatusController } from "../controllers/payment_status/GetAllPaymentsStatusController";
import { GetPaymentStatusByIdController } from "../controllers/payment_status/GetPaymentStatusByIdController";
import { DeletePaymentStatusController } from "../controllers/payment_status/DeletePaymentStatusController";

class PaymentStatusRoutes {
  private readonly router = Router();

  public async controllers() {
    const getAllPaymentsStatusController = new GetAllPaymentsStatusController();
    const getPaymentStatusByIdController = new GetPaymentStatusByIdController();
    const createPaymentStatusController = new CreatePaymentStatusController();
    const deletePaymentStatusController = new DeletePaymentStatusController();

    return {
      getAllPaymentsStatusController,
      getPaymentStatusByIdController,
      createPaymentStatusController,
      deletePaymentStatusController,
    };
  }

  public async routes() {
    const {
      getAllPaymentsStatusController,
      getPaymentStatusByIdController,
      createPaymentStatusController,
      deletePaymentStatusController,
    } = await this.controllers();

    this.router.get("/paymentstatus", getAllPaymentsStatusController.execute);
    this.router.get("/paymentstatus/:id", getPaymentStatusByIdController.execute);
    this.router.post("/paymentstatus", createPaymentStatusController.execute);
    this.router.delete("/paymentstatus/:id", deletePaymentStatusController.execute);

    return this.router;
  }
}

export default new PaymentStatusRoutes().routes();
