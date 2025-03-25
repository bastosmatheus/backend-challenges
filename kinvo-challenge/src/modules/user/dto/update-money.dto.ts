import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, Min } from "class-validator";

class UpdateMoneyDto {
  @ApiProperty({
    description: "O valor que vai depositar na conta",
    example: 200.75,
    required: true,
  })
  @IsDecimal({}, { message: "O valor do depósito deve ser um número (200.00)" })
  @Min(1, { message: "Valor minimo de 1 real para depositar na conta" })
  amount: number;
}

export { UpdateMoneyDto };
