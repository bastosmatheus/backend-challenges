import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Application } from "./entities/application.entity";
import { Repository } from "typeorm";
import { ApplicationRepository } from "./application.interface";
import { CreateApplicationDto } from "./dto/create-application.dto";

@Injectable()
class ApplicationDatabaseRepository implements ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {}

  public async getAllByCdb(cdb_id: number): Promise<Application[]> {
    const applications = await this.applicationRepository.findBy({
      cdb_id,
    });

    return applications;
  }

  public async getById(id: number): Promise<Application | null> {
    const application = await this.applicationRepository.findOneBy({
      id,
    });

    return application;
  }

  public async create(application: CreateApplicationDto): Promise<Application> {
    const applicationCreated = this.applicationRepository.create(application);

    const applicationSaved =
      await this.applicationRepository.save(applicationCreated);

    return applicationSaved;
  }
}

export { ApplicationDatabaseRepository };
