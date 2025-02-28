import { IsDecimal, Min } from "class-validator";

class UpdateMoneyDto {
  @IsDecimal({}, { message: "Informe uma quantia válida de dinheiro" })
  @Min(1, { message: "Informe uma quantia válida - mínimo 1 real" })
  amount: number;
}

export { UpdateMoneyDto };
