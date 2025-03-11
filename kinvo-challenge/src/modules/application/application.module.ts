import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { CreateApplicationService } from "./services/create-application.service";
import { ApplicationDatabaseRepository } from "./application.repository";
import { GetAllApplicationsByCdbService } from "./services/get-all-applications-by-cdb.service";
import { GetApplicationByIdService } from "./services/get-application-by-id.service";
import { CdbModule } from "../cdb/cdb.module";

@Module({
  imports: [CdbModule],
  controllers: [ApplicationController],
  providers: [
    ApplicationDatabaseRepository,
    CreateApplicationService,
    GetAllApplicationsByCdbService,
    GetApplicationByIdService,
  ],
})
export class ApplicationsModule {}
