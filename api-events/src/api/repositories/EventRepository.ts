import { Event } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { IEventRepository } from "../interfaces/IEventRepository";

class EventRepository implements IEventRepository {
  public async getAll(): Promise<Event[]> {
    const events = await prismaClient.event.findMany();

    return events;
  }

  public async getById(id: number): Promise<Event | null> {
    const event = await prismaClient.event.findFirst({
      where: {
        id,
      },
    });

    return event;
  }

  public async create(
    event_name: string,
    event_date: Date,
    event_time: number,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event> {
    const event = prismaClient.event.create({
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
    event_time: number,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event | null> {
    const event = await prismaClient.event.update({
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
      where: {
        id,
      },
    });

    return event;
  }

  public async delete(id: number): Promise<void> {
    const event = await prismaClient.event.delete({
      where: {
        id,
      },
    });
  }
}

export { EventRepository };
