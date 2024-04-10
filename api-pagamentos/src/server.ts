import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import CardRoutes from "./api/routes/CardRoutes";
import PixRoutes from "./api/routes/PixRoutes";
import PaymentStatusRoutes from "./api/routes/PaymentStatusRoutes";
import BuyerRoutes from "./api/routes/BuyerRoutes";
import PaymentInfosRoutes from "./api/routes/PaymentInfosRoutes";

const app = express();

const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonParser);
app.use(urlEncoded);
app.use(await CardRoutes);
app.use(await PixRoutes);
app.use(await PaymentStatusRoutes);
app.use(await BuyerRoutes);
app.use(await PaymentInfosRoutes);

app.listen(3000, () => {
  console.log("server rodando na porta 3000");
});
