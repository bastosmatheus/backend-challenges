import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class CreateApplicationDto {
  @ApiProperty({
    description: "O valor que vai depositar na caixinha",
    example: 200.75,
    required: true,
  })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        "O valor do depósito deve ser um número com até 2 casas decimais. Ex: 100.00",
    }
  )
  @Min(2, {
    message: "Valor minimo de 1 real para depositar na caixinha",
  })
  amount: number;

  @ApiProperty({
    description: "ID da caixinha",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID da caixinha deve ser um número" })
  @Min(1, { message: "Informe um ID de caixinha válido" })
  cdb_id: number;
}

export { CreateApplicationDto };
