import { Injectable, NotFoundException } from "@nestjs/common";
import { RedemptionDatabaseRepository } from "../redemption.repository";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";

type GetAllRedemptionsByCdbServiceRequest = {
  cdb_id: number;
};

@Injectable()
class GetAllRedemptionsByCdbService {
  constructor(
    private readonly redemptionDatabaseRepository: RedemptionDatabaseRepository,
    private readonly cdbDatabaseRepository: CdbDatabaseRepository
  ) {}

  public async execute({ cdb_id }: GetAllRedemptionsByCdbServiceRequest) {
    const cdbExists = await this.cdbDatabaseRepository.getById(cdb_id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    const redemptions =
      await this.redemptionDatabaseRepository.getAllByCdb(cdb_id);

    return redemptions;
  }
}

export { GetAllRedemptionsByCdbService };
