import { IsNumber, Min } from "class-validator";

class UpdateMoneyDto {
  @IsNumber({}, { message: "Informe uma quantia válida de dinheiro" })
  @Min(1, { message: "Informe uma quantia válida - mínimo 1 real" })
  amount: number;
}

export { UpdateMoneyDto };
