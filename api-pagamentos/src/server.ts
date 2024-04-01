import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { sql } from "./setup";
import { IBuyer } from "./api/interfaces/IBuyer";

const app = express();

const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonParser);
app.use(urlEncoded);
app.get("/users/:cpf", async (req, res) => {
  const { cpf, name } = req.params;

  const [buyer] = await sql<IBuyer[]>/*sql*/ `
    SELECT * FROM buyers
    WHERE cpf = ${cpf}
  `;

  console.log(buyer);
});

app.listen(3000, () => {
  console.log("server rodando na porta 3000");
});
