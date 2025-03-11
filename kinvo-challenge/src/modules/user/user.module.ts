import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserService } from "./services/create-user.service";
import { GetUserByEmailService } from "./services/get-user-by-email.service";
import { GetUserByIdService } from "./services/get-user-by-id.service";
import { UpdateMoneyService } from "./services/update-money.service";
import { UserDatabaseRepository } from "./user.repository";

@Module({
  controllers: [UserController],
  providers: [
    UserDatabaseRepository,
    CreateUserService,
    GetUserByEmailService,
    GetUserByIdService,
    UpdateMoneyService,
  ],
  exports: [UserDatabaseRepository],
})
export class UserModule {}
