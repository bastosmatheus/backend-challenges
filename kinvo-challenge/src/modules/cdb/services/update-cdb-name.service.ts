import { Injectable, NotFoundException } from "@nestjs/common";
import { CdbDatabaseRepository } from "../cdb.repository";

type UpdateCdbNameServiceRequest = {
  id: number;
  name: string;
};

@Injectable()
class UpdateCdbNameService {
  constructor(private readonly cbdDatabaseRepository: CdbDatabaseRepository) {}

  public async execute({ id, name }: UpdateCdbNameServiceRequest) {
    const cdbExists = await this.cbdDatabaseRepository.getById(id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    cdbExists.name = name;

    const cdb = await this.cbdDatabaseRepository.updateName(cdbExists);

    return cdb;
  }
}

export { UpdateCdbNameService };
