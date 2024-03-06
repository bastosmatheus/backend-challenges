import { Request, Response } from "express";
import { EventService } from "../services/EventService";

class EventController {
  public async getAllEvents(req: Request, res: Response) {
    const eventService = new EventService();

    const events = await eventService.getAll();

    return res.status(200).json({ type: "OK", statusCode: 200, events });
  }

  public async getEventById(req: Request, res: Response) {
    const { id } = req.params;
    const eventService = new EventService();

    const event = await eventService.getById(Number(id));

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({ type: "OK", statusCode: 200, event: event.value });
  }

  public async createEvent(req: Request, res: Response) {
    const {
      event_name,
      event_date,
      event_time,
      registration_end_date,
      limit_participants,
      user_id,
    } = req.body;

    const eventService = new EventService();

    const event = await eventService.create(
      event_name,
      event_date,
      event_time,
      registration_end_date,
      limit_participants,
      user_id
    );

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({
      message: "Evento criado com sucesso",
      type: "OK",
      statusCode: 200,
      eventCreated: event.value,
    });
  }

  public async updateEvent(req: Request, res: Response) {
    const { id } = req.params;

    const { event_name, event_date, event_time, registration_end_date, limit_participants } =
      req.body;

    const eventService = new EventService();

    const event = await eventService.update(
      Number(id),
      event_name,
      event_date,
      event_time,
      registration_end_date,
      limit_participants
    );

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({
      message: "Evento atualizado com sucesso",
      type: "OK",
      statusCode: 200,
      eventUpdated: event.value,
    });
  }

  public async deleteEvent(req: Request, res: Response) {
    const { id } = req.params;
    const eventService = new EventService();

    const event = await eventService.delete(Number(id));

    if (event.isFailure()) {
      return res.status(event.value.statusCode).json(event.value);
    }

    return res.status(200).json({
      message: "Evento excluido com sucesso",
      type: "OK",
      statusCode: 200,
      eventDeleted: event.value,
    });
  }
}

export default new EventController();
