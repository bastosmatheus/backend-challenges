import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./commom/http-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Caixinhas (cdb)")
    .setDescription(
      "Aplicação que representa um produto financeiro, conhecido como caixinha (cdb), esse produto tem aplicações e resgates (com impostos - a partir de um calculo de IR de acordo com o tempo que o usuário criou essa caixinha)"
    )
    .setVersion("1.0")
    .addTag("cdbs")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
