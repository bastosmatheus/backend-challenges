import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cdb } from "./entities/cdb.entity";
import { Repository } from "typeorm";
import { CdbRepository, CreateCdb } from "./cdb.interface";

@Injectable()
class CdbDatabaseRepository implements CdbRepository {
  constructor(
    @InjectRepository(Cdb)
    private cdbRepository: Repository<Cdb>
  ) {}

  public async getById(id: number): Promise<Cdb | null> {
    const cdb = await this.cdbRepository.findOneBy({
      id,
    });

    return cdb;
  }

  public async create(cdb: CreateCdb): Promise<Cdb> {
    const cdbCreated = this.cdbRepository.create(cdb);

    const cdbSaved = await this.cdbRepository.save(cdbCreated);

    return cdbSaved;
  }

  public async update(cdb: Cdb): Promise<Cdb> {
    const cdbUpdated = await this.cdbRepository.save(cdb);

    return cdbUpdated;
  }
}

export { CdbDatabaseRepository };
