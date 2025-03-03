import { IsEmail } from "class-validator";

class GetUserByEmailDto {
  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;
}

export { GetUserByEmailDto };
