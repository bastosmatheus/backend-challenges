import { sql } from "../../setup";
import { IBuyer } from "../interfaces/IBuyer";
import { EBuyerResponse, IBuyerRepository } from "../interfaces/IBuyerRepository";

class BuyerRepository implements IBuyerRepository {
  public async getAll(): Promise<IBuyer[]> {
    const buyers = await sql<IBuyer[]>/*sql*/ `
    SELECT * FROM buyers
  `;

    return buyers;
  }

  public async findById(id: number): Promise<IBuyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<IBuyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async findByCPF(cpf: string): Promise<IBuyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<IBuyer[]>/*sql*/ `
    SELECT * FROM buyers
    WHERE cpf = ${cpf}
  `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async create(
    name: string,
    cpf: string
  ): Promise<IBuyer | EBuyerResponse.CPFAlreadyExists> {
    const [cpfExists] = await sql<IBuyer[]>/*sql*/ `
      SELECT * FROM buyer
      WHERE cpf = ${cpf}
  `;

    if (cpfExists) {
      return EBuyerResponse.CPFAlreadyExists;
    }

    const [buyer] = await sql<IBuyer[]>/*sql*/ `
      INSERT INTO buyers (name, cpf)
      VALUES (${name}, ${cpf})

      RETURNING *
    `;

    return buyer;
  }

  public async update(id: number, name: string): Promise<IBuyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<IBuyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    const [buyerUpdated] = await sql<IBuyer[]>/*sql*/ `
      UPDATE buyers
      SET name = ${name}
      WHERE id = ${id}
    `;

    return buyerUpdated;
  }

  public async delete(id: number): Promise<IBuyer | EBuyerResponse.BuyerNotFound> {
    const [buyer] = await sql<IBuyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id}
    `;

    if (typeof buyer === "undefined") {
      return EBuyerResponse.BuyerNotFound;
    }

    const [buyerDeleted] = await sql<IBuyer[]>/*sql*/ `
      DELETE FROM buyers
      WHERE id = ${id}
    `;

    return buyerDeleted;
  }
}

export { BuyerRepository };
