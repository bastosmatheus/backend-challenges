import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { Either, failure, success } from "../errors/either";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";

class UserService {
  private userRepository = new UserRepository();

  public async getAll(): Promise<User[]> {
    const users = await this.userRepository.getAll();

    return users;
  }

  public async getById(
    id: number
  ): Promise<Either<UnprocessableEntityError | NotFoundError, User>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const user = await this.userRepository.getById(id);

    if (user === null) {
      return failure(new NotFoundError("Usuário não encontrado"));
    }

    return success(user);
  }

  public async create(
    username: string,
    email: string,
    password: string
  ): Promise<Either<UnprocessableEntityError | ConflictError, User>> {
    if (!username || username === "") {
      return failure(new UnprocessableEntityError("O nome do usuário é obrigatório"));
    }

    if (!email || email === "") {
      return failure(new UnprocessableEntityError("O email é obrigatório"));
    }

    if (!password || password === "") {
      return failure(new UnprocessableEntityError("A senha é obrigatória"));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create(username, email, passwordHash);

    if (Object.keys(user)[0] === "username") {
      return failure(new ConflictError("Esse nome de usuário já existe"));
    }

    if (Object.keys(user)[0] === "email") {
      return failure(new ConflictError("Esse email já existe"));
    }

    return success(user);
  }

  public async update(
    id: number,
    username: string,
    email: string,
    password: string
  ): Promise<Either<UnprocessableEntityError | NotFoundError, User>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    if (!username || username === "") {
      return failure(new UnprocessableEntityError("O nome do usuário é obrigatório"));
    }

    if (!email || email === "") {
      return failure(new UnprocessableEntityError("O email é obrigatório"));
    }

    if (!password || password === "") {
      return failure(new UnprocessableEntityError("A senha é obrigatória"));
    }

    const user = await this.userRepository.update(id, username, email, password);

    if (user === null) {
      return failure(new NotFoundError("Usuário não encontrado"));
    }

    return success(user);
  }

  public async delete(id: number): Promise<Either<NotFoundError | UnprocessableEntityError, User>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const user = await this.userRepository.delete(id);

    if (user === null) {
      return failure(new NotFoundError("Usuário não encontrado"));
    }

    return success(user);
  }
}

export { UserService };
