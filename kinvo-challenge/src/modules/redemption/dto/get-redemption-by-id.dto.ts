import { IsNumber, Min } from "class-validator";

class GetRedemptionByIdDto {
  @IsNumber({}, { message: "O ID deve ser um número" })
  @Min(1, { message: "Informe um ID válido" })
  id: number;
}

export { GetRedemptionByIdDto };
