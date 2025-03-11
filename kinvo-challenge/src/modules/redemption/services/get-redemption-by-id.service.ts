import { Injectable, NotFoundException } from "@nestjs/common";
import { RedemptionDatabaseRepository } from "../redemption.repository";

type GetRedemptionByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetRedemptionByIdService {
  constructor(
    private readonly redemptionDatabaseRepository: RedemptionDatabaseRepository
  ) {}

  public async execute({ id }: GetRedemptionByIdServiceRequest) {
    const redemption = await this.redemptionDatabaseRepository.getById(id);

    if (!redemption) {
      throw new NotFoundException("Nenhum resgate encontrado");
    }

    return redemption;
  }
}

export { GetRedemptionByIdService };
