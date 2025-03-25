import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class GetApplicationByIdDto {
  @ApiProperty({
    description: "ID da aplicação",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID deve ser um número" })
  @Min(1, { message: "Informe um ID válido" })
  id: number;
}

export { GetApplicationByIdDto };
