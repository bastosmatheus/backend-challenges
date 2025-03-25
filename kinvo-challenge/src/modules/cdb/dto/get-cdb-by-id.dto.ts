import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class GetCdbByIdDto {
  @ApiProperty({
    description: "ID da caixinha",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID deve ser um número" })
  @Min(1, { message: "Informe um ID válido" })
  id: number;
}

export { GetCdbByIdDto };
