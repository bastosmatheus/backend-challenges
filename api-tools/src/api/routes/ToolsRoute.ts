import { Router } from "express";
import ToolsController from "../controllers/ToolsController";

export const routerTools = Router();

routerTools.post("/tools", ToolsController.AddTool);
routerTools.get("/tools", ToolsController.GetTools);
routerTools.delete("/tools/:id", ToolsController.DeleteTool);
