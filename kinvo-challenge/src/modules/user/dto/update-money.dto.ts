import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class UpdateMoneyDto {
  @ApiProperty({
    description: "O valor que vai depositar na conta",
    example: 200.75,
    required: true,
  })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        "O valor de depósito deve ser um número com até 2 casas decimais. Ex: 100.00",
    }
  )
  @Min(1, { message: "Valor minimo de 1 real para depositar na conta" })
  amount: number;
}

export { UpdateMoneyDto };
