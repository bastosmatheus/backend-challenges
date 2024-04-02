import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonParser);
app.use(urlEncoded);

app.listen(3000, () => {
  console.log("server rodando na porta 3000");
});
