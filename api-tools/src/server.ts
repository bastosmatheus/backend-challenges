import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { routerTools } from "./api/routes/toolsRoute";

const app = express();
const jsonBodyParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonBodyParser);
app.use(urlParser);
app.use(routerTools);

app.listen(3000, () => {
  const prisma = new PrismaClient();

  prisma.$connect();

  console.log("server rodando na porta 3000");
});
