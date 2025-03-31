import { Module } from "@nestjs/common";
import { CdbController } from "./cdb.controller";
import { CreateCdbService } from "./services/create-cdb.service";
import { GetCdbByIdService } from "./services/get-cdb-by-id.service";
import { UpdateCdbNameService } from "./services/update-cdb-name.service";
import { CdbDatabaseRepository } from "./cdb.repository";
import { UserModule } from "../user/user.module";
import { Cdb } from "./entities/cdb.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateProfitService } from "./services/update-profit.service";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Cdb])],
  controllers: [CdbController],
  providers: [
    CdbDatabaseRepository,
    CreateCdbService,
    GetCdbByIdService,
    UpdateCdbNameService,
    UpdateProfitService,
  ],
  exports: [CdbDatabaseRepository],
})
export class CdbModule {}
