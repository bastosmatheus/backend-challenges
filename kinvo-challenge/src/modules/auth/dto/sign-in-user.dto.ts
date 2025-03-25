import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

class SignInUserDto {
  @ApiProperty({
    description: "E-mail do usuário",
    example: "matheus@email.com",
    required: true,
  })
  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;

  @ApiProperty({
    description: "Senha do usuário (minimo 8 caracteres)",
    example: "12345678",
    required: true,
  })
  @IsString({ message: "A senha do usuário deve ser uma string" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  password: string;
}

export { SignInUserDto };
