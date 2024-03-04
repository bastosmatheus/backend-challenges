import { EventRepository } from "../repositories/EventRepository";

class EventService {
  private readonly eventRepository = new EventRepository();

  public async getAll() {
    const events = await this.eventRepository.getAll();

    return events;
  }

  public async getById(id: number) {
    const event = await this.eventRepository.getById(id);

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
  ) {
    const event = await this.eventRepository.create(
      event_name,
      event_date,
      event_time,
      registration_start_date,
      registration_end_date,
      limit_participants,
      user_id,
      additional_infos
    );

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
    user_id: number,
    additional_infos?: string
  ) {
    const event = await this.eventRepository.update(
      id,
      event_name,
      event_date,
      event_time,
      registration_start_date,
      registration_end_date,
      limit_participants,
      user_id,
      additional_infos
    );

    return event;
  }

  public async delete(id: number) {
    const event = await this.eventRepository.delete(id);
  }
}

export { EventService };
