import { Cdb } from "../cdb/entities/cdb.entity";
import { CreateRedemptionDto } from "./dto/create-redemption.dto";
import { Redemption } from "./entities/redemption.entity";
import { RedemptionRepository } from "./redemption.interface";

class RedemptionDatabaseRepositoryMock implements RedemptionRepository {
  private readonly redemptions: Redemption[] = [];

  public async getAllByCdb(cdb_id: number): Promise<Redemption[]> {
    const redemptions = this.redemptions.filter(
      (redemption) => redemption.cdb_id === cdb_id
    );

    return redemptions;
  }

  public async getById(id: number): Promise<Redemption | null> {
    const redemption = this.redemptions.find(
      (redemption) => redemption.id === id
    );

    if (!redemption) return null;

    return redemption;
  }

  public async create(redemption: CreateRedemptionDto): Promise<Redemption> {
    const redemptionCreated = {
      id: this.redemptions.length + 1,
      ...redemption,
      created_at: new Date(),
      cdb: new Cdb(),
    };

    this.redemptions.push(redemptionCreated);

    return redemptionCreated;
  }
}

export { RedemptionDatabaseRepositoryMock };
