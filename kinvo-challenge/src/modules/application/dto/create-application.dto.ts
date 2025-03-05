import { IsDecimal, IsNumber, Min } from "class-validator";

class CreateApplicationDto {
  @IsDecimal({}, { message: "Informe uma quantia válida" })
  @Min(2, {
    message: "Valor minimo de 1 real para colocar dinheiro na caixinha",
  })
  amount: number;

  @IsNumber({}, { message: "O ID da caixinha deve ser um número" })
  @Min(1, { message: "Informe um ID de caixinha válido" })
  cdb_id: number;
}

export { CreateApplicationDto };
