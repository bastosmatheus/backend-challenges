import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
class UserDatabaseRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  public async getById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return user;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    return user;
  }

  public async create(user: CreateUserDto): Promise<User> {
    const userCreated = this.usersRepository.create(user);

    const userSaved = await this.usersRepository.save(userCreated);

    return userSaved;
  }

  public async updateMoney(user: User): Promise<User> {
    const userUpdated = await this.usersRepository.save(user);

    return userUpdated;
  }
}

export { UserDatabaseRepository };
