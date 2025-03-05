import { IsNumber, Min } from "class-validator";

class GetApplicationsByCdbDto {
  @IsNumber({}, { message: "O ID da caixinha deve ser um número" })
  @Min(1, { message: "Informe um ID de caixinha válido" })
  cdb_id: number;
}

export { GetApplicationsByCdbDto };
