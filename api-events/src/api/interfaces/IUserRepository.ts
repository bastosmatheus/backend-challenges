import { User } from "@prisma/client";

type EmailExists = {
  email: string;
};

type UsernameExists = {
  username: string;
};

interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(
    username: string,
    email: string,
    password: string
  ): Promise<User | EmailExists | UsernameExists>;
  update(id: number, username: string, email: string, password: string): Promise<User | null>;
  delete(id: number): Promise<User | null>;
}

export { IUserRepository, EmailExists, UsernameExists };
