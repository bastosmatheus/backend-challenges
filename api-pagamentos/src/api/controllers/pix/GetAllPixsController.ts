import { Request, Response } from "express";
import { PixRepository } from "../../repositories/PixRepository";
import { GetAllPixsService } from "../../services/pix/GetAllPixsService";

class GetAllPixsController {
  public async execute(req: Request, res: Response) {
    const pixRepository = new PixRepository();

    const getAllPixsService = new GetAllPixsService(pixRepository);

    const pixs = await getAllPixsService.execute();

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      pixs,
    });
  }
}

export { GetAllPixsController };
