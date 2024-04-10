import { Request, Response } from "express";
import { PixRepository } from "../../repositories/PixRepository";
import { GetPixByIdService } from "../../services/pix/GetPixByIdService";

class GetPixByIdController {
  public async execute(req: Request, res: Response) {
    const { id } = req.params;

    const pixRepository = new PixRepository();

    const getPixByIdService = new GetPixByIdService(pixRepository);

    const pix = await getPixByIdService.execute(Number(id));

    if (pix.isFailure()) {
      console.log(pix.value);
      return res.status(pix.value.statusCode).json({
        message: pix.value.message,
        type: pix.value.type,
        statusCode: pix.value.statusCode,
      });
    }

    return res.status(200).json({
      type: "OK",
      statusCode: 200,
      pix: pix.value,
    });
  }
}

export { GetPixByIdController };
