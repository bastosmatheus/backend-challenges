import { Pix, EPixResponse, IPixRepository } from "../interfaces/IPixRepository";
import { Buyer } from "../interfaces/IBuyerRepository";
import { sql } from "../database/db";

class PixRepository implements IPixRepository {
  public async getAll(): Promise<Pix[]> {
    const pixs = await sql<Pix[]>/*sql*/ `
      SELECT pixs.id, code_generated, buyer_name 
      FROM pixs
      INNER JOIN buyers on pix.id_buyer = buyers.id
    `;

    return pixs;
  }

  public async getById(id: number): Promise<Pix | EPixResponse.PixNotFound> {
    const [pix] = await sql<Pix[]>/*sql*/ `
      SELECT pixs.id, code_generated, buyer_name
      FROM pixs
      INNER JOIN buyers ON pixs.id_buyer = buyers.id
      WHERE pixs.id = ${id}
    `;

    if (typeof pix === "undefined") {
      return EPixResponse.PixNotFound;
    }

    return pix;
  }

  public async create(
    code_generated: string,
    id_buyer: number
  ): Promise<Pix | EPixResponse.CodeAlreadyExists | EPixResponse.BuyerNotFound> {
    const [codeExists] = await sql<Pix[]>/*sql*/ `
      SELECT * FROM pixs
      WHERE code_generated = ${code_generated}
    `;

    if (codeExists) {
      return EPixResponse.CodeAlreadyExists;
    }

    const [buyerExists] = await sql<Buyer[]>/*sql*/ `
      SELECT * FROM buyers
      WHERE id = ${id_buyer}
    `;

    if (!buyerExists) {
      return EPixResponse.BuyerNotFound;
    }

    const [pix] = await sql<Pix[]>/*sql*/ `
      INSERT INTO Pixs (code_generated, id_buyer)
      VALUES (${code_generated}, ${id_buyer})
    `;

    return pix;
  }
}

export { PixRepository };
