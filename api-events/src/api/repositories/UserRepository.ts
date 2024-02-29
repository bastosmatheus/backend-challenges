import { User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { prismaClient } from "../database/prismaClient";

class UserRepository implements IUserRepository {
  public async getAllUsers(): Promise<User[]> {
    const users = await prismaClient.user.findMany();

    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  public async createUser(username: string, email: string, password: string): Promise<User> {
    const user = prismaClient.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  public async updateUser(
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

  public async deleteUser(id: number): Promise<void> {
    const user = await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

export { UserRepository };
