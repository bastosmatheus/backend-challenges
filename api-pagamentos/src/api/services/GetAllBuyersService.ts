import { Buyer } from "../interfaces/IBuyerRepository";
import { BuyerRepository } from "../repositories/BuyerRepository";

class GetAllBuyersService {
  constructor(private buyerRepository: BuyerRepository) {}

  public async execute(): Promise<Buyer[]> {
    const buyer = await this.buyerRepository.getAll();

    return buyer;
  }
}

export { GetAllBuyersService };
