import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class ToolsController {
  public async AddTool(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;

    try {
      const tool = await prismaClient.tools.create({
        data: {
          title,
          link,
          description,
          tags,
        },
      });

      res
        .status(200)
        .json({ message: "Ferramenta criada com sucesso", type: "OK", statusCode: 200, tool });
    } catch (error) {
      console.error(error);
    }
  }

  public async GetTools(req: Request, res: Response) {
    if (req.query.tag) {
      const { tag } = req.query;

      try {
        const tools = await prismaClient.tools.findMany({
          where: {
            tags: {
              has: String(tag),
            },
          },
        });

        return res.status(200).json({ type: "OK", statusCode: 200, tools });
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const tool = await prismaClient.tools.findMany();

      res.status(200).json({ type: "OK", statusCode: 200, tool });
    } catch (error) {
      console.error(error);
    }
  }

  public async DeleteTool(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const tool = await prismaClient.tools.delete({
        where: {
          id: Number(id),
        },
      });
      return res
        .status(200)
        .json({ message: "Ferramenta deletada com sucessod", type: "OK", statusCode: 200 });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ToolsController();
