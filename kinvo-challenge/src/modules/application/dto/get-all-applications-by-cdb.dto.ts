import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class GetAllApplicationsByCdbDto {
  @ApiProperty({
    description: "ID da caixinha",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID da caixinha deve ser um número" })
  @Min(1, { message: "Informe um ID de caixinha válido" })
  cdb_id: number;
}

export { GetAllApplicationsByCdbDto };
