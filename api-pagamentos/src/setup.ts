import { sql } from "./api/database/db";

async function createTableBuyers() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS buyers (
      id SERIAL PRIMARY KEY,
      buyer_name TEXT,
      cpf CHAR(11) UNIQUE
    )
  `;
}

async function createTableFormsPayments() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS forms_payments (
      id SERIAL PRIMARY KEY,
      payment_name TEXT UNIQUE
    )
  `;
}

async function createTablePaymentsInfos() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS payments_infos (
      id SERIAL PRIMARY KEY,
      price REAL,
      payment_status TEXT,
      id_form_payment SERIAL REFERENCES forms_payments(id),
      id_buyer SERIAL REFERENCES buyers(id)
    )
  `;
}

async function createTableCards() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS cards (
      id SERIAL PRIMARY KEY,
      card_holder_name TEXT,
      card_number TEXT UNIQUE,
      cvv CHAR(3),
      expiration_date DATE,
      id_buyer SERIAL REFERENCES buyers(id)
    )
  `;
}

async function createTablePixs() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS pixs (
      id SERIAL PRIMARY KEY,
      code_generated TEXT UNIQUE,
      id_buyer SERIAL REFERENCES buyers(id)
    )
  `;
}

createTableBuyers();
createTableFormsPayments();
createTablePaymentsInfos();
createTableCards();
createTablePixs();

export { sql };
