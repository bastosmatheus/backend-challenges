import { CreateRedemptionDto } from "./dto/create-redemption.dto";
import { Redemption } from "./entities/redemption.entity";

interface RedemptionRepository {
  getAllByCdb(cdb_id: number): Promise<Redemption[]>;
  getById(id: number): Promise<Redemption | null>;
  create(redemption: CreateRedemptionDto): Promise<Redemption>;
}

export { RedemptionRepository };
