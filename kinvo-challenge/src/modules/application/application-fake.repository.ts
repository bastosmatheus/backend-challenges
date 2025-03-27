import { Cdb } from "../cdb/entities/cdb.entity";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { Application } from "./entities/application.entity";
import { ApplicationRepository } from "./application.interface";

class ApplicationDatabaseRepositoryMock implements ApplicationRepository {
  private readonly applications: Application[] = [];

  public async getAllByCdb(cdb_id: number): Promise<Application[]> {
    const applications = this.applications.filter(
      (application) => application.cdb_id === cdb_id
    );

    return applications;
  }

  public async getById(id: number): Promise<Application | null> {
    const application = this.applications.find(
      (application) => application.id === id
    );

    if (!application) return null;

    return application;
  }

  public async create(application: CreateApplicationDto): Promise<Application> {
    const applicationCreated = {
      id: this.applications.length + 1,
      ...application,
      created_at: new Date(),
      cdb: new Cdb(),
    };

    this.applications.push(applicationCreated);

    return applicationCreated;
  }
}

export { ApplicationDatabaseRepositoryMock };
