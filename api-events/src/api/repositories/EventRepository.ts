import { Event } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { EResponseEvent, IEventRepository } from "../interfaces/IEventRepository";

class EventRepository implements IEventRepository {
  public async getAll(): Promise<Event[]> {
    const events = await prismaClient.event.findMany();

    return events;
  }

  public async getById(id: number): Promise<Event | EResponseEvent.EventNotFound> {
    const event = await prismaClient.event.findUnique({
      where: {
        id,
      },
    });

    if (event === null) {
      return EResponseEvent.EventNotFound;
    }

    return event;
  }

  public async create(
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event | EResponseEvent.UserNotFound | EResponseEvent.EventExists> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user === null) {
      return EResponseEvent.UserNotFound;
    }

    const eventExists = await prismaClient.event.findUnique({
      where: {
        event_name,
      },
      select: {
        event_name: true,
      },
    });

    if (eventExists) {
      return EResponseEvent.EventExists;
    }

    const event = await prismaClient.event.create({
      data: {
        event_name,
        event_date,
        event_time,
        registration_start_date,
        registration_end_date,
        limit_participants,
        user_id,
        additional_infos,
      },
    });

    return event;
  }

  public async update(
    id: number,
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    additional_infos?: string
  ): Promise<Event | EResponseEvent.EventNotFound> {
    const event = await prismaClient.event.findUnique({
      where: {
        id,
      },
    });

    if (event === null) {
      return EResponseEvent.EventNotFound;
    }

    const eventUpdated = await prismaClient.event.update({
      data: {
        event_name,
        event_date,
        event_time,
        registration_start_date,
        registration_end_date,
        limit_participants,
        additional_infos,
      },
      where: {
        id,
      },
    });

    return eventUpdated;
  }

  public async delete(id: number): Promise<Event | EResponseEvent.EventNotFound> {
    const event = await prismaClient.event.delete({
      where: {
        id,
      },
    });

    if (event === null) {
      return EResponseEvent.EventNotFound;
    }

    return event;
  }
}

export { EventRepository };
