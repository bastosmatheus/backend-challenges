import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Redemption } from "./entities/redemption.entity";
import { Repository } from "typeorm";
import { RedemptionRepository } from "./redemption.interface";
import { CreateRedemptionDto } from "./dto/create-redemption.dto";

@Injectable()
class RedemptionDatabaseRepository implements RedemptionRepository {
  constructor(
    @InjectRepository(Redemption)
    private redemptionRepository: Repository<Redemption>
  ) {}

  public async getAllByCdb(cdb_id: number): Promise<Redemption[]> {
    const redemptions = await this.redemptionRepository.findBy({
      cdb_id,
    });

    return redemptions;
  }

  public async getById(id: number): Promise<Redemption | null> {
    const redemption = await this.redemptionRepository.findOneBy({
      id,
    });

    return redemption;
  }

  public async create(redemption: CreateRedemptionDto): Promise<Redemption> {
    const redemptionCreated = this.redemptionRepository.create(redemption);

    const redemptionSaved =
      await this.redemptionRepository.save(redemptionCreated);

    return redemptionSaved;
  }
}

export { RedemptionDatabaseRepository };
