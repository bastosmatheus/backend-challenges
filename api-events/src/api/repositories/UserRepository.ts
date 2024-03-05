import { User } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { EResponseUser, IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  public async getAll(): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      include: {
        created_events: true,
        event_registration: true,
      },
    });

    return users;
  }

  public async getById(id: number): Promise<User | EResponseUser.UserNotFound> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      include: {
        created_events: true,
        event_registration: true,
      },
    });

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    return user;
  }

  public async create(
    username: string,
    email: string,
    password: string
  ): Promise<User | EResponseUser.UsernameExists | EResponseUser.EmailExists> {
    const usernameExists = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (usernameExists) {
      return EResponseUser.UsernameExists;
    }

    const emailExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (emailExists) {
      return EResponseUser.EmailExists;
    }

    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  public async update(
    id: number,
    username: string,
    email: string,
    password: string
  ): Promise<User | EResponseUser.UserNotFound> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    const userUpdated = await prismaClient.user.update({
      data: {
        username,
        email,
        password,
      },
      where: {
        id,
      },
    });

    return userUpdated;
  }

  public async delete(id: number): Promise<User | EResponseUser.UserNotFound> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return EResponseUser.UserNotFound;
    }

    const userDeleted = await prismaClient.user.delete({
      where: {
        id,
      },
    });

    return userDeleted;
  }
}

export { UserRepository };
