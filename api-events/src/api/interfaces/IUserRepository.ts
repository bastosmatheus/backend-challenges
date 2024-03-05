import { User } from "@prisma/client";

enum EResponseUser {
  EmailExists,
  UsernameExists,
  UserNotFound,
}

interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | EResponseUser.UserNotFound>;
  create(
    username: string,
    email: string,
    password: string
  ): Promise<User | EResponseUser.UsernameExists | EResponseUser.EmailExists>;
  update(
    id: number,
    username: string,
    email: string,
    password: string
  ): Promise<User | EResponseUser.UserNotFound>;
  delete(id: number): Promise<User | EResponseUser.UserNotFound>;
  login(email: string): Promise<User | EResponseUser.UserNotFound>;
}

export { IUserRepository, EResponseUser };
