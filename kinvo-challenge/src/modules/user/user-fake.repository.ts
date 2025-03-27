import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.interface";

class UserDatabaseRepositoryMock implements UserRepository {
  private readonly users: User[] = [];

  public async getById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  public async create(user: CreateUserDto): Promise<User> {
    const userCreated = {
      id: this.users.length + 1,
      ...user,
      cdbs: [],
      money: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(userCreated);

    return userCreated;
  }

  public async updateMoney(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      (userFind) => userFind.id === user.id
    );

    this.users[userIndex].money = user.money;

    return this.users[userIndex];
  }
}

export { UserDatabaseRepositoryMock };
