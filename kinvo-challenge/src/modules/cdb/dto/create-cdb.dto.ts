import {
  IsDecimal,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

class CreateCdbDto {
  @IsString({ message: "Informe um nome válido para a caixinha" })
  @MaxLength(50, {
    message: "Informe um nome válido para a caixinha - máximo 50 caracteres",
  })
  @MinLength(3, {
    message: "Informe um nome válido para a caixinha - minímo 3 caracteres",
  })
  name: string;

  @IsDecimal({}, { message: "Informe uma quantia válida" })
  @Min(2, { message: "Valor minimo de 1 real para criar uma caixinha" })
  amount_initial: number;

  @IsNumber({}, { message: "O ID do usuário deve ser um número" })
  @Min(1, { message: "Informe um ID de usuário válido" })
  user_id: number;
}

export { CreateCdbDto };
