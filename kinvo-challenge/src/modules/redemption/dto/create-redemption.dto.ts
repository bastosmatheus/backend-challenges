import { IsDecimal, IsNumber, Min } from "class-validator";

class CreateRedemptionDto {
  @IsDecimal({}, { message: "Informe uma quantia válida" })
  @Min(2, {
    message: "Valor minimo de 1 real para retirar dinheiro da caixinha",
  })
  amount: number;

  @IsNumber({}, { message: "O ID da caixinha deve ser um número" })
  @Min(1, { message: "Informe um ID de caixinha válido" })
  cdb_id: number;
}

export { CreateRedemptionDto };
