import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

class CreateCdbDto {
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

  @ApiProperty({
    description: "O valor inicial para criação de uma caixinha",
    example: 200.75,
    required: true,
  })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        "O valor inicial da caixinha deve ser um número com até 2 casas decimais. Ex: 100.00",
    }
  )
  @Min(1, { message: "Valor minimo de 1 real para criar uma caixinha" })
  amount_initial: number;

  @ApiProperty({
    description: "ID do usuário",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID do usuário deve ser um número" })
  @Min(1, { message: "Informe um ID de usuário válido" })
  user_id: number;
}

export { CreateCdbDto };
