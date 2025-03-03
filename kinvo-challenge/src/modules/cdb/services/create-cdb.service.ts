import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { CdbDatabaseRepository } from "../cdb.repository";

type CreateCdbServiceRequest = {
  name: string;
  amount_initial: number;
  user_id: number;
};

@Injectable()
class CreateCdbService {
  constructor(
    private readonly userDatabaseRepository: UserDatabaseRepository,
    private readonly cbdDatabaseRepository: CdbDatabaseRepository
  ) {}

  public async execute({
    name,
    amount_initial,
    user_id,
  }: CreateCdbServiceRequest) {
    const userExists = await this.userDatabaseRepository.getById(user_id);

    if (!userExists) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    const cdb = await this.cbdDatabaseRepository.create({
      name,
      amount_initial,
      user_id,
    });

    return cdb;
  }
}

export { CreateCdbService };
