import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ApplicationDatabaseRepository } from "../application.repository";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";
import { UserDatabaseRepository } from "src/modules/user/user.repository";

type CreateApplicationServiceRequest = {
  amount: number;
  cdb_id: number;
};

@Injectable()
class CreateApplicationService {
  constructor(
    private readonly applicationDatabaseRepository: ApplicationDatabaseRepository,
    private readonly cdbDatabaseRepository: CdbDatabaseRepository,
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ amount, cdb_id }: CreateApplicationServiceRequest) {
    const cdbExists = await this.cdbDatabaseRepository.getById(cdb_id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    const userExists = await this.userDatabaseRepository.getById(
      cdbExists.user_id
    );

    if (!userExists) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    const isNotPossibleDeposit = userExists.money - amount < 0;

    if (isNotPossibleDeposit) {
      throw new BadRequestException("Saldo insuficiente");
    }

    cdbExists.total += amount;
    userExists.money -= amount;

    await this.cdbDatabaseRepository.update(cdbExists);
    await this.userDatabaseRepository.updateMoney(userExists);

    const application = await this.applicationDatabaseRepository.create({
      amount,
      cdb_id,
    });

    return application;
  }
}

export { CreateApplicationService };
