import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { routerUser } from "./api/routes/UserRoute";

const app = express();

const jsonBodyParser = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonBodyParser);
app.use(urlencoded);
app.use(routerUser);

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
