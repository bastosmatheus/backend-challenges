import { Application } from "src/modules/application/entities/application.entity";
import { Cdb } from "src/modules/cdb/entities/cdb.entity";
import { Redemption } from "src/modules/redemption/entities/redemption.entity";
import { User } from "src/modules/user/entities/user.entity";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";

config();

const configService = new ConfigService();

const dataSource = new DataSource({
  type: "mysql",
  host: configService.get<string>("MYSQL_HOST"),
  port: configService.get<number>("MYSQL_PORT"),
  username: configService.get<string>("MYSQL_USER"),
  password: configService.get<string>("MYSQL_PASSWORD"),
  database: configService.get<string>("MYSQL_DATABASE"),
  entities: [User, Cdb, Redemption, Application],
  migrations: ["src/database/migrations/**.ts"],
  synchronize: false,
});

export default dataSource;
