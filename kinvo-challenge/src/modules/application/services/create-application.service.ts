import { Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationDatabaseRepository } from "../application.repository";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";

type CreateApplicationServiceRequest = {
  amount: number;
  cdb_id: number;
};

@Injectable()
class CreateApplicationService {
  constructor(
    private readonly applicationDatabaseRepository: ApplicationDatabaseRepository,
    private readonly cdbDatabaseRepository: CdbDatabaseRepository
  ) {}

  public async execute({ amount, cdb_id }: CreateApplicationServiceRequest) {
    const cdbExists = await this.cdbDatabaseRepository.getById(cdb_id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
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
