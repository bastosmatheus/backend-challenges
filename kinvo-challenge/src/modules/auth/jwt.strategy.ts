import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { UserDatabaseRepository } from "src/modules/user/user.repository";

type PayloadToken = {
  id: number;
  name: string;
};

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userDatabaseRepository: UserDatabaseRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwt-secret",
    });
  }

  async validate(payload: PayloadToken) {
    const { id, name } = payload;

    const userExists = await this.userDatabaseRepository.getById(id);

    if (!userExists) {
      throw new UnauthorizedException();
    }

    return { id, name };
  }
}

export { JwtStrategy };
