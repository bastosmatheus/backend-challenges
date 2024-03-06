import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class ToolsController {
  public async GetTools(req: Request, res: Response) {
    if (req.query.tag) {
      const { tag } = req.query;

      try {
        const tools = await prismaClient.tool.findMany({
          where: {
            tags: {
              has: String(tag),
            },
          },
        });

        return res.status(200).json({ type: "OK", statusCode: 200, toolsWithTag: tools });
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const tools = await prismaClient.tool.findMany();

      return res.status(200).json({ type: "OK", statusCode: 200, tools });
    } catch (error) {
      console.error(error);
    }
  }

  public async AddTool(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;

    try {
      const tool = await prismaClient.tool.create({
        data: {
          title,
          link,
          description,
          tags,
        },
      });

      return res.status(201).json({
        message: "Ferramenta criada com sucesso",
        type: "OK",
        statusCode: 201,
        toolCreated: tool,
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async DeleteTool(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const tool = await prismaClient.tool.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({
        message: "Ferramenta deletada com sucesso",
        type: "OK",
        statusCode: 200,
        toolDeleted: tool,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ToolsController();
