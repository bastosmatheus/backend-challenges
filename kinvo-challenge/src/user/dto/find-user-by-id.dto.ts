import { IsNumber, Min } from "class-validator";

class GetUserByIdDto {
  @IsNumber({}, { message: "O ID deve ser um número" })
  @Min(1, { message: "Informe um ID válido" })
  id: number;
}

export { GetUserByIdDto };
