import { Event } from "@prisma/client";
import { EventRepository } from "../repositories/EventRepository";
import { EResponseEvent } from "../interfaces/IEventRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { Either, failure, success } from "../errors/either";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";

class EventService {
  private readonly eventRepository = new EventRepository();

  public async getAll(): Promise<Event[]> {
    const events = await this.eventRepository.getAll();

    return events;
  }

  public async getById(
    id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, Event>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const event = await this.eventRepository.getById(id);

    if (event === EResponseEvent.EventNotFound) {
      return failure(new NotFoundError("Nenhum evento foi encontrado com o ID: " + id));
    }

    return success(event);
  }

  public async create(
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_end_date: Date,
    limit_participants: number,
    user_id: number,
    additional_infos?: string
  ): Promise<Either<UnprocessableEntityError | NotFoundError, Event>> {
    if (!event_name || event_name === "") {
      return failure(new UnprocessableEntityError("O nome do evento é obrigatório"));
    }

    if (!event_date) {
      return failure(new UnprocessableEntityError("A data do evento é obrigatória"));
    }

    if (!event_time) {
      return failure(new UnprocessableEntityError("O horário de inicio é obrigatório"));
    }

    if (!limit_participants) {
      return failure(new UnprocessableEntityError("Informe o número máximo de participantes"));
    }

    if (!user_id) {
      return failure(
        new UnprocessableEntityError("É necessário informar o id do usuário que criará este evento")
      );
    }

    const event = await this.eventRepository.create(
      event_name,
      event_date,
      event_time,
      registration_end_date,
      limit_participants,
      user_id,
      additional_infos ?? ""
    );

    if (event === EResponseEvent.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + user_id));
    }

    if (event === EResponseEvent.EventExists) {
      return failure(
        new ConflictError("Não é possível dar esse nome para o evento, pois ele já existe")
      );
    }

    return success(event);
  }

  public async update(
    id: number,
    event_name: string,
    event_date: Date,
    event_time: Date,
    registration_end_date: Date,
    limit_participants: number,
    additional_infos?: string
  ): Promise<Either<UnprocessableEntityError | NotFoundError, Event>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    if (!event_name || event_name === "") {
      return failure(new UnprocessableEntityError("O nome do evento é obrigatório"));
    }

    if (!event_date) {
      return failure(new UnprocessableEntityError("A data do evento é obrigatória"));
    }

    if (!event_time) {
      return failure(new UnprocessableEntityError("O horário de inicio é obrigatório"));
    }

    if (!limit_participants) {
      return failure(new UnprocessableEntityError("Informe o número máximo de participantes"));
    }

    const event = await this.eventRepository.update(
      id,
      event_name,
      event_date,
      event_time,
      registration_end_date,
      limit_participants,
      additional_infos ?? ""
    );

    if (event === EResponseEvent.EventNotFound) {
      return failure(new NotFoundError("Nenhum evento foi encontrado com o ID: " + id));
    }

    return success(event);
  }

  public async delete(
    id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, Event>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const event = await this.eventRepository.delete(id);

    if (event === EResponseEvent.EventNotFound) {
      return failure(new NotFoundError("Nenhum evento foi encontrado com o ID: " + id));
    }

    return success(event);
  }
}

export { EventService };
