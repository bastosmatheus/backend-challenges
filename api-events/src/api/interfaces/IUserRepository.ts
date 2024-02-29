import { User } from "@prisma/client";

interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(username: string, email: string, password: string): Promise<User>;
  updateUser(id: number, username: string, email: string, password: string): Promise<User | null>;
  deleteUser(id: number): Promise<void>;
}

export { IUserRepository };
