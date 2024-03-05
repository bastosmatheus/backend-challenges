import { Request, Response } from "express";
import { EventRegistrationService } from "../services/EventRegistrationService";

class EventController {
  public async getAllEventsRegistrations(req: Request, res: Response) {
    const eventRegistrationService = new EventRegistrationService();

    const eventsRegistrations = await eventRegistrationService.getAll();

    return res.status(200).json({ type: "OK", statusCode: 200, eventsRegistrations });
  }

  public async getEventRegistrationById(req: Request, res: Response) {
    const { id } = req.params;

    const eventRegistrationService = new EventRegistrationService();

    const eventRegistration = await eventRegistrationService.getById(Number(id));

    if (eventRegistration.isFailure()) {
      return res.status(eventRegistration.value.statusCode).json(eventRegistration.value);
    }

    return res
      .status(200)
      .json({ type: "OK", statusCode: 200, eventRegistration: eventRegistration.value });
  }

  public async createEventRegistration(req: Request, res: Response) {
    const { event_id, user_id } = req.body;

    const eventRegistrationService = new EventRegistrationService();

    const event = await eventRegistrationService.create(event_id, user_id);

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({
      message: "Inscrição no evento feita com sucesso",
      type: "OK",
      statusCode: 200,
      eventRegistrationCreated: event.value,
    });
  }

  public async deleteEventRegistration(req: Request, res: Response) {
    const { id } = req.params;

    const eventRegistrationService = new EventRegistrationService();

    const event = await eventRegistrationService.delete(Number(id));

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({
      message: "Inscrição no evento excluida com sucesso",
      type: "OK",
      statusCode: 200,
      eventRegistrationDeleted: event.value,
    });
  }
}

export default new EventController();
