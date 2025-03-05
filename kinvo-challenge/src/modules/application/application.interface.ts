import { CreateApplicationDto } from "./dto/create-application.dto";
import { Application } from "./entities/application.entity";

interface ApplicationRepository {
  getAllByCdb(cdb_id: number): Promise<Application[]>;
  getById(id: number): Promise<Application | null>;
  create(application: CreateApplicationDto): Promise<Application>;
}

export { ApplicationRepository };
