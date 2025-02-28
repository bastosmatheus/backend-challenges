import { IsEmail, IsString, MinLength } from "class-validator";

class SignInUserDto {
  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;

  @IsString({ message: "Informe uma senha válida" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  password: string;
}

export { SignInUserDto };
