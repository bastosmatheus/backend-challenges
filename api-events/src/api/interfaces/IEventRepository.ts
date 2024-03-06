import { Event } from "@prisma/client";

enum EResponseEvent {
  EventExists,
  UserNotFound,
  EventNotFound,
}

interface IEventRepository {
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event | EResponseEvent.EventNotFound>;
  create(
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event | EResponseEvent.UserNotFound | EResponseEvent.EventExists>;
  update(
    id: number,
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_end_date: Date,
    limit_participants: number,
    additional_infos?: string
  ): Promise<Event | EResponseEvent.EventNotFound>;
  delete(id: number): Promise<Event | EResponseEvent.EventNotFound>;
}

export { IEventRepository, EResponseEvent };
