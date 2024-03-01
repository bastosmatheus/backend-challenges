import { Router } from "express";
import EventController from "../controllers/EventController";

// criar uma classe para acesso da rota
const routerEvent = Router();

routerEvent.get("/events", EventController.getAllEvents);
routerEvent.get("/events/:id", EventController.getEventById);
routerEvent.post("/events", EventController.createEvent);
routerEvent.put("/events/:id", EventController.updateEvent);
routerEvent.delete("/events/:id", EventController.deleteEvent);

export { routerEvent };
