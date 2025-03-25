import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

class GetUserByEmailDto {
  @ApiProperty({
    description: "E-mail do usuário",
    example: "matheus@email.com",
    required: true,
  })
  @IsEmail({}, { message: "Informe um e-mail válido" })
  email: string;
}

export { GetUserByEmailDto };
