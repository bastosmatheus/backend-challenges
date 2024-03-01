import { Request, Response } from "express";
import { EventService } from "../services/EventService";

class EventController {
  public async getAllEvents(req: Request, res: Response) {
    const eventService = new EventService();

    try {
      const events = await eventService.getAll();

      return res.status(200).json({ type: "OK", statusCode: 200, events });
    } catch (error) {
      console.error(error);
    }
  }

  public async getEventById(req: Request, res: Response) {
    const { id } = req.params;
    const eventService = new EventService();

    try {
      const event = await eventService.getById(Number(id));

      return res.status(200).json({ type: "OK", statusCode: 200, event });
    } catch (error) {
      console.error(error);
    }
  }

  public async createEvent(req: Request, res: Response) {
    const {
      event_name,
      event_date,
      event_time,
      registration_start_date,
      registration_end_date,
      limit_participants,
      user_id,
    } = req.body;

    const eventService = new EventService();

    try {
      const event = await eventService.create(
        event_name,
        event_date,
        event_time,
        registration_start_date,
        registration_end_date,
        limit_participants,
        user_id
      );

      return res
        .status(200)
        .json({ message: "Usuário criado com sucesso", type: "OK", statusCode: 200, event });
    } catch (error) {
      console.error(error);
    }
  }

  public async updateEvent(req: Request, res: Response) {
    const { id } = req.params;
    const {
      event_name,
      event_date,
      event_time,
      registration_start_date,
      registration_end_date,
      limit_participants,
      user_id,
    } = req.body;
    const eventService = new EventService();

    try {
      const event = await eventService.update(
        Number(id),
        event_name,
        event_date,
        event_time,
        registration_start_date,
        registration_end_date,
        limit_participants,
        user_id
      );

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", type: "OK", statusCode: 200, event });
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteEvent(req: Request, res: Response) {
    const { id } = req.params;
    const eventService = new EventService();

    try {
      const event = await eventService.delete(Number(id));

      return res
        .status(200)
        .json({ message: "Usuário excluido com sucesso", type: "OK", statusCode: 200 });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new EventController();
