import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

    const isNotPossibleDeposit = userExists.money < amount_initial;

    if (isNotPossibleDeposit) {
      throw new BadRequestException("Saldo insuficiente");
    }

    const cdb = await this.cbdDatabaseRepository.create({
      name,
      amount_initial,
      user_id,
      total: amount_initial,
    });

    return cdb;
  }
}

export { CreateCdbService };
