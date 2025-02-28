import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

interface UserRepository {
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  updateMoney(user: User): Promise<User>;
}

export { UserRepository };
