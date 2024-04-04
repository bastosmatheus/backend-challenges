import { Pix } from "../../interfaces/IPixRepository";
import { PixRepository } from "../../repositories/PixRepository";

class GetAllPixsService {
  constructor(private pixRepository: PixRepository) {}

  public async execute(): Promise<Pix[]> {
    const pixs = await this.pixRepository.getAll();

    return pixs;
  }
}

export { GetAllPixsService };
