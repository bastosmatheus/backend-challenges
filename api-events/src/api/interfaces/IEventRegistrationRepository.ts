import { EventRegistration } from "@prisma/client";

enum EResponseEventRegistration {
  UserNotFound,
  EventNotFound,
  UserIsAlreadyRegistered,
}

interface IEventRegistrationRepository {
  getAll(): Promise<EventRegistration[]>;
  getById(id: number): Promise<EventRegistration | EResponseEventRegistration.EventNotFound>;
  create(
    event_id: number,
    user_id: number
  ): Promise<
    | EventRegistration
    | EResponseEventRegistration.UserNotFound
    | EResponseEventRegistration.EventNotFound
    | EResponseEventRegistration.UserIsAlreadyRegistered
  >;
  delete(id: number): Promise<EventRegistration | EResponseEventRegistration.EventNotFound>;
}

export { IEventRegistrationRepository, EResponseEventRegistration };
