import { User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
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
      include: {
        created_events: true,
        event_registration: true,
      },
    });

    return user;
  }

  public async create(username: string, email: string, password: string): Promise<User> {
    const user = prismaClient.user.create({
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
    const user = await prismaClient.user.update({
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

  public async delete(id: number): Promise<void> {
    const user = await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export { UserRepository };
