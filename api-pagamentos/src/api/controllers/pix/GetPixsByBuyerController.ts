import { Request, Response } from "express";
import { PixRepository } from "../../repositories/PixRepository";
import { GetPixsByBuyerService } from "../../services/pix/GetPixsByBuyerService";

class GetPixsByBuyerController {
  public async execute(req: Request, res: Response) {
    const { id_buyer } = req.query;

    const pixRepository = new PixRepository();

    const getPixsByBuyerService = new GetPixsByBuyerService(pixRepository);

    const pixs = await getPixsByBuyerService.execute(Number(id_buyer));

    if (pixs.isFailure()) {
      return res.status(pixs.value.statusCode).json({
        message: pixs.value.message,
        type: pixs.value.type,
        statusCode: pixs.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      pixs: pixs.value,
    });
  }
}

export { GetPixsByBuyerController };
