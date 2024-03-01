import { prismaClient } from "../database/prismaClient";
import { NotFoundError } from "../errors/NotFoundError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
import { Either, failure, success } from "../errors/either";
import { UserRepository } from "../repositories/UserRepository";

class UserService {
  private userRepository = new UserRepository();

  public async getAll() {
    const users = await this.userRepository.getAll();

    return users;
  }

  public async getById(id: number) {
    const user = await this.userRepository.getById(id);

    return user;
  }

  public async create(username: string, email: string, password: string) {
    const user = await this.userRepository.create(username, email, password);

    return user;
  }

  public async update(id: number, username: string, email: string, password: string) {
    const user = await this.userRepository.update(id, username, email, password);

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

export { UserService };
