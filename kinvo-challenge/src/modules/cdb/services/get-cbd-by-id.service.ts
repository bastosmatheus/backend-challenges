import { Injectable, NotFoundException } from "@nestjs/common";
import { CdbDatabaseRepository } from "../cdb.repository";

type GetCdbByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetCdbByIdService {
  constructor(private readonly cbdDatabaseRepository: CdbDatabaseRepository) {}

  public async execute({ id }: GetCdbByIdServiceRequest) {
    const cdb = await this.cbdDatabaseRepository.getById(id);

    if (!cdb) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    return cdb;
  }
}

export { GetCdbByIdService };
