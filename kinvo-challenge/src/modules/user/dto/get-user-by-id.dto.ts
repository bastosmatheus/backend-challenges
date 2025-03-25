import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

class GetUserByIdDto {
  @ApiProperty({
    description: "ID do usuário",
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: "O ID deve ser um número" })
  @Min(1, { message: "Informe um ID válido" })
  id: number;
}

export { GetUserByIdDto };
