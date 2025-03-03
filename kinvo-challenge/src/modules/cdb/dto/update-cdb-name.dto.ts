import { IsString, MaxLength, MinLength } from "class-validator";

class UpdateCdbNameDto {
  @IsString({ message: "Informe um nome válido para a caixinha" })
  @MaxLength(50, {
    message: "Informe um nome válido para a caixinha - máximo 50 caracteres",
  })
  @MinLength(3, {
    message: "Informe um nome válido para a caixinha - minímo 3 caracteres",
  })
  name: string;
}

export { UpdateCdbNameDto };
