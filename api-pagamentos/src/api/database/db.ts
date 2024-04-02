import postgres from "postgres";
import { configDotenv } from "dotenv";

const env = configDotenv();

const sql = postgres(process.env.DATABASE_URL as string);

export { sql };
