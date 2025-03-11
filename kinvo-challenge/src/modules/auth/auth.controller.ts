import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SignInService } from "./services/sign-in.service";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Controller("auth")
class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Post("signin")
  public async create(@Body() signInUserDto: SignInUserDto) {
    try {
      const { email, password } = signInUserDto;

      const accessToken = await this.signInService.execute({ email, password });

      return {
        access_token: accessToken,
      };
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export { AuthController };
