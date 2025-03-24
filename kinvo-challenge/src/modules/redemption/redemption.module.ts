import { Module } from "@nestjs/common";
import { RedemptionController } from "./redemption.controller";
import { RedemptionDatabaseRepository } from "./redemption.repository";
import { CreateRedemptionService } from "./services/create-redemption.service";
import { GetAllRedemptionsByCdbService } from "./services/get-all-redemptions-by-cdb.service";
import { GetRedemptionByIdService } from "./services/get-redemption-by-id.service";
import { CdbModule } from "../cdb/cdb.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Redemption } from "./entities/redemption.entity";

@Module({
  imports: [CdbModule, TypeOrmModule.forFeature([Redemption])],
  controllers: [RedemptionController],
  providers: [
    RedemptionDatabaseRepository,
    CreateRedemptionService,
    GetAllRedemptionsByCdbService,
    GetRedemptionByIdService,
  ],
})
export class RedemptionsModule {}
