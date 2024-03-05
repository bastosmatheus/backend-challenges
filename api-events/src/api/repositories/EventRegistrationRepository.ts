import { EventRegistration } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import {
  EResponseEventRegistration,
  IEventRegistrationRepository,
} from "../interfaces/IEventRegistrationRepository";

class EventRegistrationRepository implements IEventRegistrationRepository {
  public async getAll(): Promise<EventRegistration[]> {
    const eventsRegistrations = await prismaClient.eventRegistration.findMany();

    return eventsRegistrations;
  }

  public async getById(
    id: number
  ): Promise<EventRegistration | EResponseEventRegistration.EventNotFound> {
    const eventRegistration = await prismaClient.eventRegistration.findUnique({
      where: {
        id,
      },
    });

    if (eventRegistration === null) {
      return EResponseEventRegistration.EventNotFound;
    }

    return eventRegistration;
  }

  public async create(
    event_id: number,
    user_id: number
  ): Promise<
    | EventRegistration
    | EResponseEventRegistration.UserNotFound
    | EResponseEventRegistration.EventNotFound
    | EResponseEventRegistration.UserIsAlreadyRegistered
  > {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user === null) {
      return EResponseEventRegistration.UserNotFound;
    }

    const event = await prismaClient.event.findUnique({
      where: {
        id: event_id,
      },
    });

    if (event === null) {
      return EResponseEventRegistration.EventNotFound;
    }

    const userIsAlreadyRegistered = await prismaClient.user.findFirst({
      where: {
        id: user_id,
        event_registration: {
          some: {
            event_id,
          },
        },
      },
    });

    console.log(userIsAlreadyRegistered);

    if (userIsAlreadyRegistered) {
      return EResponseEventRegistration.UserIsAlreadyRegistered;
    }

    const eventRegistration = await prismaClient.eventRegistration.create({
      data: {
        event_id,
        user_id,
      },
    });

    return eventRegistration;
  }

  public async delete(
    id: number
  ): Promise<EventRegistration | EResponseEventRegistration.EventNotFound> {
    const eventRegistration = await prismaClient.eventRegistration.delete({
      where: {
        id,
      },
    });

    if (eventRegistration === null) {
      return EResponseEventRegistration.EventNotFound;
    }

    return eventRegistration;
  }
}

export { EventRegistrationRepository };
