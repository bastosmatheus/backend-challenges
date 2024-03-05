import { EventRegistration } from "@prisma/client";
import { EventRegistrationRepository } from "../repositories/EventRegistrationRepository";
import { EResponseEventRegistration } from "../interfaces/IEventRegistrationRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { Either, failure, success } from "../errors/either";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";

class EventRegistrationService {
  private readonly eventRegistrationRepository = new EventRegistrationRepository();

  public async getAll(): Promise<EventRegistration[]> {
    const eventsRegistrations = await this.eventRegistrationRepository.getAll();

    return eventsRegistrations;
  }

  public async getById(
    id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, EventRegistration>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const eventRegistration = await this.eventRegistrationRepository.getById(id);

    if (eventRegistration === EResponseEventRegistration.EventNotFound) {
      return failure(new NotFoundError("Nenhum evento foi encontrado com o ID: " + id));
    }

    return success(eventRegistration);
  }

  public async create(
    event_id: number,
    user_id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, EventRegistration>> {
    if (!event_id) {
      return failure(
        new UnprocessableEntityError(
          "É necessário informar o id do evento para efetuar a inscrição"
        )
      );
    }

    if (!user_id) {
      return failure(
        new UnprocessableEntityError(
          "É necessário informar o id do usuário a ser inscrito no evento"
        )
      );
    }

    const eventRegistration = await this.eventRegistrationRepository.create(event_id, user_id);

    if (eventRegistration === EResponseEventRegistration.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + user_id));
    }

    if (eventRegistration === EResponseEventRegistration.EventNotFound) {
      return failure(new NotFoundError("Nenhum evento foi encontrado com o ID: " + event_id));
    }

    if (eventRegistration == EResponseEventRegistration.UserIsAlreadyRegistered) {
      return failure(new ConflictError("Esse usuário já está cadastrado no evento"));
    }

    return success(eventRegistration);
  }

  public async delete(
    id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, EventRegistration>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const eventRegistration = await this.eventRegistrationRepository.delete(id);

    if (eventRegistration === EResponseEventRegistration.EventNotFound) {
      return failure(
        new NotFoundError("Nenhuma inscrição de evento foi encontrada com o ID: " + id)
      );
    }

    return success(eventRegistration);
  }
}

export { EventRegistrationService };
