import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDatabaseRepository } from "../user.repository";

type GetUserByEmailServiceRequest = {
  email: string;
};

@Injectable()
class GetUserByEmailService {
  constructor(
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ email }: GetUserByEmailServiceRequest) {
    const user = await this.userDatabaseRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    return user;
  }
}

export { GetUserByEmailService };
