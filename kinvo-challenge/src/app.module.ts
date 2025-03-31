import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CdbModule } from "./modules/cdb/cdb.module";
import { RedemptionsModule } from "./modules/redemption/redemption.module";
import { ApplicationsModule } from "./modules/application/application.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/user/entities/user.entity";
import { Cdb } from "./modules/cdb/entities/cdb.entity";
import { Redemption } from "./modules/redemption/entities/redemption.entity";
import { Application } from "./modules/application/entities/application.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development.local",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("MYSQL_HOST"),
        port: configService.get<number>("MYSQL_PORT"),
        username: configService.get<string>("MYSQL_USER"),
        password: configService.get<string>("MYSQL_PASSWORD"),
        database: configService.get<string>("MYSQL_DATABASE"),
        entities: [User, Cdb, Redemption, Application],
        migrations: [__dirname + `/database/migrations/**.ts`],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CdbModule,
    RedemptionsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
