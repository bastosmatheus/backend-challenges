import { User } from "@prisma/client";

interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(username: string, email: string, password: string): Promise<User>;
  update(id: number, username: string, email: string, password: string): Promise<User | null>;
  delete(id: number): Promise<void>;
}

export { IUserRepository };
