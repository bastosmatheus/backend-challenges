import { Request, Response } from "express";
import { PixRepository } from "../../repositories/PixRepository";
import { CreatePixService } from "../../services/pix/CreatePixService";

class CreatePixController {
  public async execute(req: Request, res: Response) {
    const { code_generated, id_buyer } = req.body;

    const pixRepository = new PixRepository();

    const createPixService = new CreatePixService(pixRepository);

    const pix = await createPixService.execute(code_generated, id_buyer);

    if (pix.isFailure()) {
      return res.status(pix.value.statusCode).json({
        message: pix.value.message,
        type: pix.value.type,
        statusCode: pix.value.statusCode,
      });
    }

    return res.status(201).json({
      message: "Pix criado",
      type: "OK",
      statusCode: 201,
      pix: pix.value,
    });
  }
}

export { CreatePixController };
