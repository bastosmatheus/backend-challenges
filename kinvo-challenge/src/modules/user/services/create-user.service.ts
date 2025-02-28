import { ConflictException, Injectable } from "@nestjs/common";
import { UserDatabaseRepository } from "../user.repository";
import { hash } from "bcrypt";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
class CreateUserService {
  constructor(
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ name, email, password }: CreateUserServiceRequest) {
    const userAlreadyExists =
      await this.userDatabaseRepository.getByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException("Usuário já cadastrado");
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userDatabaseRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export { CreateUserService };
