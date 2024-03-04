import { Event } from "@prisma/client";

interface IEventRepository {
  getAll(): Promise<Event[]>;
  getById(id: number): Promise<Event | null>;
  create(
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event>;
  update(
    id: number,
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_start_date: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Event | null>;
  delete(id: number): Promise<Event>;
}

export { IEventRepository };
