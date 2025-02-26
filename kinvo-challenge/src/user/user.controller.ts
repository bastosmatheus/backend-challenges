import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CreateUserService } from "./services/create-user.service";
import { GetUserByIdService } from "./services/get-user-by-id.service";
import { GetUserByEmailService } from "./services/get-user-by-email.service";
import { UpdateMoneyService } from "./services/update-money.service";
import { GetUserByEmailDto } from "./dto/find-user-by-email.dto";
import { GetUserByIdDto } from "./dto/find-user-by-id.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateMoneyDto } from "./dto/update-money.dto";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";

@Controller("users")
export class UserController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly createUserService: CreateUserService,
    private readonly updateMoneyService: UpdateMoneyService
  ) {}

  @Get("/email")
  public async getUserByEmail(
    @Query("email") getUserByEmailDto: GetUserByEmailDto
  ) {
    try {
      const { email } = getUserByEmailDto;

      const user = await this.getUserByEmailService.execute({ email });

      return user;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Get(":id")
  public async getUserById(
    @IsNumberParam("id") getUserByIdDto: GetUserByIdDto
  ) {
    try {
      const { id } = getUserByIdDto;

      const user = await this.getUserByIdService.execute({ id });

      return user;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;

      const user = await this.createUserService.execute({
        name,
        email,
        password,
      });

      return user;
    } catch (error: unknown) {
      console.log(error);
    }
  }

  @Patch(":id/money")
  public async updateMoney(
    @IsNumberParam("id") id: number,
    @Body() updateMoneyDto: UpdateMoneyDto
  ) {
    try {
      const { amount } = updateMoneyDto;

      const user = await this.updateMoneyService.execute({
        id,
        amount,
      });

      return user;
    } catch (error: unknown) {
      console.log(error);
    }
  }
}
