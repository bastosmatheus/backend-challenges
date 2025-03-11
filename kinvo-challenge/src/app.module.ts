import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CdbModule } from "./modules/cdb/cdb.module";
import { RedemptionsModule } from "./modules/redemption/redemption.module";
import { ApplicationsModule } from "./modules/application/application.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    CdbModule,
    RedemptionsModule,
    ApplicationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
