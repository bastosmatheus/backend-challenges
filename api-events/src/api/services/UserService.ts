import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository";
import { EResponseUser } from "../interfaces/IUserRepository";
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

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrando com o ID: " + id));
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

    if (user === EResponseUser.UsernameExists) {
      return failure(
        new ConflictError("Não é possível usar esse nome de usuário, pois ele já existe")
      );
    }

    if (user === EResponseUser.EmailExists) {
      return failure(
        new ConflictError("Não é possível usar esse email, pois ele já foi cadastrado")
      );
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

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.userRepository.update(id, username, email, passwordHash);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + id));
    }

    return success(user);
  }

  public async delete(id: number): Promise<Either<NotFoundError | UnprocessableEntityError, User>> {
    if (!id) {
      return failure(new UnprocessableEntityError("O ID é obrigatório"));
    }

    const user = await this.userRepository.delete(id);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário foi encontrado com o ID: " + id));
    }

    return success(user);
  }

  public async login(
    email: string,
    password: string
  ): Promise<Either<NotFoundError | UnprocessableEntityError, { token: string }>> {
    if (!email || email === "") {
      return failure(new UnprocessableEntityError("O email é obrigatório"));
    }

    if (!password || password === "") {
      return failure(new UnprocessableEntityError("A senha é obrigatória"));
    }

    const user = await this.userRepository.login(email);

    if (user === EResponseUser.UserNotFound) {
      return failure(new NotFoundError("Nenhum usuário encontrado com esse email: " + email));
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return failure(new NotFoundError("Senha inválida"));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PASS ?? "", {
      expiresIn: "30d",
    });

    return success({ token });
  }
}

export { UserService };
