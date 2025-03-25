import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, Min } from "class-validator";

class CreateRedemptionDto {
  @ApiProperty({
    description: "O valor que vai resgatar da caixinha",
    example: 200.75,
    required: true,
  })
  @IsDecimal({}, { message: "O valor do resgate deve ser um número (200.00)" })
  @Min(2, {
    message: "Valor minimo de 1 real para retirar dinheiro da caixinha",
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

export { CreateRedemptionDto };
