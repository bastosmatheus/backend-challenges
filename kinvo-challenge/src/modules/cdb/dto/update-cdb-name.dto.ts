import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

class UpdateCdbNameDto {
  @ApiProperty({
    description: "Nome da caixinha",
    example: "Reserva de emergência",
    required: true,
  })
  @IsString({ message: "O nome da caixinha deve ser uma string" })
  @MaxLength(50, {
    message: "Informe um nome válido para a caixinha - máximo 50 caracteres",
  })
  @MinLength(3, {
    message: "Informe um nome válido para a caixinha - minímo 3 caracteres",
  })
  name: string;
}

export { UpdateCdbNameDto };
