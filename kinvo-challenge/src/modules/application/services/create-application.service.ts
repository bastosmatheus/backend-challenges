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

    const user = cdbExists.user;

    const isNotPossibleDeposit = user.money - amount < 0;

    if (isNotPossibleDeposit) {
      throw new BadRequestException("Saldo insuficiente");
    }

    cdbExists.total += amount;

    await this.cdbDatabaseRepository.update(cdbExists);

    const application = await this.applicationDatabaseRepository.create({
      amount,
      cdb_id,
    });

    return application;
  }
}

export { CreateApplicationService };
