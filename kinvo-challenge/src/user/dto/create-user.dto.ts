import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

class CreateUserDto {
  @IsString({ message: "Informe um nome válido" })
  @MaxLength(50, { message: "Informe um nome válido - máximo 50 caracteres" })
  @MinLength(3, { message: "Informe um nome válido - minímo 3 caracteres" })
  name: string;

  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;

  @IsString({ message: "Informe uma senha válida" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  password: string;
}

export { CreateUserDto };
