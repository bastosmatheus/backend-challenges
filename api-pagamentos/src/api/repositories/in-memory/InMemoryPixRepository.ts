import { Buyer } from "../../interfaces/IBuyerRepository";
import { Pix, EPixResponse, IPixRepository } from "../../interfaces/IPixRepository";

class InMemoryPixRepository implements IPixRepository {
  public readonly pixs: Pix[] = [];
  public readonly buyers: Buyer[] = [
    {
      id: 1,
      name: "Matheus",
      cpf: "12345678901",
    },
  ];

  public async getAll(): Promise<Pix[]> {
    return this.pixs;
  }

  public async getById(id: number): Promise<Pix | EPixResponse.PixNotFound> {
    const pix = this.pixs.find((pix) => pix.id === id);

    if (!pix) {
      return EPixResponse.PixNotFound;
    }

    return pix;
  }

  public async getByBuyer(id_buyer: number): Promise<Pix[] | EPixResponse.BuyerNotFound> {
    const buyer = this.buyers.find((buyer) => buyer.id === id_buyer);

    if (!buyer) {
      return EPixResponse.BuyerNotFound;
    }

    const pixsByBuyer = this.pixs.filter((pix) => pix.id_buyer == id_buyer);

    return pixsByBuyer;
  }

  public async create(
    code_generated: string,
    id_buyer: number
  ): Promise<Pix | EPixResponse.BuyerNotFound | EPixResponse.CodeAlreadyExists> {
    const codeExists = this.pixs.find((pix) => pix.code_generated === code_generated);

    if (codeExists) {
      return EPixResponse.CodeAlreadyExists;
    }

    const buyerExists = this.buyers.find((buyer) => buyer.id === id_buyer);

    if (!buyerExists) {
      return EPixResponse.BuyerNotFound;
    }

    const pix = {
      id: 1,
      code_generated,
      id_buyer,
    };

    this.pixs.push(pix);

    return pix;
  }
}

export { InMemoryPixRepository };
