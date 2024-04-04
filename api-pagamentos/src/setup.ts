import { sql } from "./api/database/db";

async function createTableBuyers() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS buyers (
      id SERIAL PRIMARY KEY,
      buyer_name TEXT,
      cpf CHAR(11) UNIQUE,
      created_at DATE DEFAULT NOW()
    )
  `;
}

async function createTablePaymentStatus() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS payments_status (
      id SERIAL PRIMARY KEY,
      name_status TEXT UNIQUE
    )
  `;
}

async function createTablePaymentsInfos() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS payments_infos (
      id SERIAL PRIMARY KEY,
      price REAL,
      created_at DATE DEFAULT NOW(),
      id_status INTEGER REFERENCES payments_status(id),
      id_buyer INTEGER REFERENCES buyers(id),
      id_card INTEGER REFERENCES cards(id),
      id_pix INTEGER REFERENCES pixs(id)
    )
  `;
}

async function createTableCards() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS cards (
      id SERIAL PRIMARY KEY,
      card_holder_name TEXT,
      card_number VARCHAR(16) UNIQUE,
      cvv CHAR(3),
      expiration_date DATE,
      created_at DATE DEFAULT NOW(),
      id_buyer INTEGER REFERENCES buyers(id)
    )
  `;
}

async function createTablePixs() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS pixs (
      id SERIAL PRIMARY KEY,
      code_generated TEXT UNIQUE,
      created_at DATE DEFAULT NOW(),
      id_buyer INTEGER REFERENCES buyers(id)
    )
  `;
}

createTableBuyers();
createTablePaymentStatus();
createTablePaymentsInfos();
createTableCards();
createTablePixs();

export { sql };
