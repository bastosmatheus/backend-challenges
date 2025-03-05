import { Injectable, NotFoundException } from "@nestjs/common";
import { ApplicationDatabaseRepository } from "../application.repository";

type GetApplicationByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetApplicationByIdService {
  constructor(
    private readonly applicationDatabaseRepository: ApplicationDatabaseRepository
  ) {}

  public async execute({ id }: GetApplicationByIdServiceRequest) {
    const application = await this.applicationDatabaseRepository.getById(id);

    if (!application) {
      throw new NotFoundException("Nenhuma aplicação encontrada");
    }

    return application;
  }
}

export { GetApplicationByIdService };
