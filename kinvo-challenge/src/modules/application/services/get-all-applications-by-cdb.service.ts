import { Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationDatabaseRepository } from "../application.repository";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";

type GetAllApplicationsByCdbServiceRequest = {
  cdb_id: number;
};

@Injectable()
class GetAllApplicationsByCdbService {
  constructor(
    private readonly applicationDatabaseRepository: ApplicationDatabaseRepository,
    private readonly cdbDatabaseRepository: CdbDatabaseRepository
  ) {}

  public async execute({ cdb_id }: GetAllApplicationsByCdbServiceRequest) {
    const cdbExists = await this.cdbDatabaseRepository.getById(cdb_id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    const applications =
      await this.applicationDatabaseRepository.getAllByCdb(cdb_id);

    return applications;
  }
}

export { GetAllApplicationsByCdbService };
