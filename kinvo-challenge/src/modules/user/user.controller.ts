import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserService } from "./services/create-user.service";
import { GetUserByIdService } from "./services/get-user-by-id.service";
import { GetUserByEmailService } from "./services/get-user-by-email.service";
import { UpdateMoneyService } from "./services/update-money.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateMoneyDto } from "./dto/update-money.dto";
import { IsNumberParam } from "src/pipes/is-number-param.pipe";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly createUserService: CreateUserService,
    private readonly updateMoneyService: UpdateMoneyService
  ) {}

  @Get("/email")
  public async getUserByEmail(@Query("email") email: string) {
    const user = await this.getUserByEmailService.execute({ email });

    return user;
  }

  @Get(":id")
  public async getUserById(@IsNumberParam("id") id: number) {
    const user = await this.getUserByIdService.execute({ id });

    return user;
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const user = await this.createUserService.execute({
      name,
      email,
      password,
    });

    return user;
  }

  @Patch(":id/money")
  @UseGuards(JwtAuthGuard)
  public async updateMoney(
    @IsNumberParam("id") id: number,
    @Body() updateMoneyDto: UpdateMoneyDto
  ) {
    const { amount } = updateMoneyDto;

    const user = await this.updateMoneyService.execute({
      id,
      amount,
    });

    return user;
  }
}
