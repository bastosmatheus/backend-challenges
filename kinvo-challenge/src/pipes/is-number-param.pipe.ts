import { HttpStatus, Param, ParseIntPipe } from "@nestjs/common";

function IsNumberParam(id: string): ParameterDecorator {
  return Param(
    id,
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => {
        return {
          message: "O ID deve ser um número",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      },
    })
  );
}

export { IsNumberParam };
