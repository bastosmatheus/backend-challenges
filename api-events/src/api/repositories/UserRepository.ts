import { User } from "@prisma/client";
import { EmailExists, IUserRepository, UsernameExists } from "../interfaces/IUserRepository";
import { prismaClient } from "../database/prismaClient";

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

  public async getById(id: number): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async create(
    username: string,
    email: string,
    password: string
  ): Promise<User | EmailExists | UsernameExists> {
    const usernameExists = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (usernameExists) {
      return usernameExists;
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
      return emailExists;
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
  ): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return user;
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

    return user;
  }

  public async delete(id: number): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return user;
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
