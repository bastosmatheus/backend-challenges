import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cdb } from "./entities/cdb.entity";
import { Repository } from "typeorm";
import { CdbRepository } from "./cdb.interface";
import { CreateCdbDto } from "./dto/create-cdb.dto";

@Injectable()
class CdbDatabaseRepository implements CdbRepository {
  constructor(
    @InjectRepository(Cdb)
    private cdbRepository: Repository<Cdb>
  ) {}

  public async getAll(): Promise<Cdb[]> {
    const cdb = await this.cdbRepository.find();

    return cdb;
  }

  public async getById(id: number): Promise<Cdb | null> {
    const cdb = await this.cdbRepository.findOneBy({
      id,
    });

    return cdb;
  }

  public async create(cdb: CreateCdbDto): Promise<Cdb> {
    const cdbUpdated = {
      ...cdb,
      total: cdb.amount_initial,
    };

    const cdbCreated = this.cdbRepository.create(cdbUpdated);

    const cdbSaved = await this.cdbRepository.save(cdbCreated);

    return cdbSaved;
  }

  public async update(cdb: Cdb): Promise<Cdb> {
    const cdbUpdated = await this.cdbRepository.save(cdb);

    return cdbUpdated;
  }
}

export { CdbDatabaseRepository };
