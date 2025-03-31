import { CreateCdbDto } from "./dto/create-cdb.dto";
import { Cdb } from "./entities/cdb.entity";

interface CdbRepository {
  getAll(): Promise<Cdb[]>;
  getById(id: number): Promise<Cdb | null>;
  create(cdb: CreateCdbDto): Promise<Cdb>;
  update(cdb: Cdb): Promise<Cdb>;
}

export { CdbRepository };
