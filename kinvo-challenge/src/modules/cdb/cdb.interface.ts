import { CreateCdbDto } from "./dto/create-cdb.dto";
import { Cdb } from "./entities/cdb.entity";

type CreateCdb = Pick<Cdb, "name" | "amount_initial" | "total" | "user_id">;

interface CdbRepository {
  getById(id: number): Promise<Cdb | null>;
  create(cdb: CreateCdb): Promise<Cdb>;
  update(cdb: Cdb): Promise<Cdb>;
}

export { CdbRepository, CreateCdb };
