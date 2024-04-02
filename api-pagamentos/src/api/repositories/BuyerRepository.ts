import { EBuyerResponse, IBuyerRepository, Buyer } from "../interfaces/IBuyerRepository";
import { sql } from "../database/db";

class BuyerRepository implements IBuyerRepository {
  public async getAll(): Promise<Buyer[]> {
    const buyers = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
    `;

    return buyers;
  }

  public async getById(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async getByCpf(cpf: string): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE cpf = ${cpf}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async create(name: string, cpf: string): Promise<Buyer | EBuyerResponse.CPFAlreadyExists> {
    const [cpfExists] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE cpf = ${cpf}
    `;

    if (cpfExists) {
      return EBuyerResponse.CPFAlreadyExists;
    }

    const [buyer] = await sql<Buyer[]>/*sql*/ `
      INSERT INTO buyers (name, cpf)
      VALUES (${name}, ${cpf})

      RETURNING *
    `;

    return buyer;
  }

  public async update(id: number, name: string): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    const [buyerUpdated] = await sql<Buyer[]>/*sql*/ `
      UPDATE buyers
      SET name = ${name}
      WHERE id = ${id}
    `;

    return buyerUpdated;
  }

  public async delete(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    const [buyerDeleted] = await sql<Buyer[]>/*sql*/ `
      DELETE FROM buyers
      WHERE id = ${id}
    `;

    return buyerDeleted;
  }
}

export { BuyerRepository };
