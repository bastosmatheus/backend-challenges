import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserDatabaseRepository } from "src/user/user.repository";

type SignInServiceRequest = {
  email: string;
  password: string;
};

@Injectable()
class SignInService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ email, password }: SignInServiceRequest) {
    const userExists = await this.userDatabaseRepository.getByEmail(email);

    if (!userExists) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const isPasswordValid = await compare(password, userExists.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const payload = { id: userExists.id, name: userExists.name };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}

export { SignInService };
