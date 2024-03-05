import { Router } from "express";
import EventRegistrationController from "../controllers/EventRegistrationController";

// criar uma classe para acesso da rota
const routerEventRegistration = Router();

routerEventRegistration.get(
  "/events-registrations",
  EventRegistrationController.getAllEventsRegistrations
);
routerEventRegistration.get(
  "/events-registrations/:id",
  EventRegistrationController.getEventRegistrationById
);
routerEventRegistration.post(
  "/events-registrations",
  EventRegistrationController.createEventRegistration
);
routerEventRegistration.delete(
  "/events-registrations/:id",
  EventRegistrationController.deleteEventRegistration
);

export { routerEventRegistration };
