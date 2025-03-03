import { CreateCdbDto } from "./dto/create-cdb.dto";
import { Cdb } from "./entities/cdb.entity";

interface CdbRepository {
  getById(id: number): Promise<Cdb | null>;
  create(cdb: CreateCdbDto): Promise<Cdb>;
  updateName(cdb: Cdb): Promise<Cdb>;
}

export { CdbRepository };
