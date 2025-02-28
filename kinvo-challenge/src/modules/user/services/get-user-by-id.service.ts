import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDatabaseRepository } from "../user.repository";

type GetUserByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetUserByIdService {
  constructor(
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ id }: GetUserByIdServiceRequest) {
    const user = await this.userDatabaseRepository.getById(id);

    if (!user) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    return user;
  }
}

export { GetUserByIdService };
