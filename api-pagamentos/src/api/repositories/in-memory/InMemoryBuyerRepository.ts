import { Buyer, EBuyerResponse, IBuyerRepository } from "../../interfaces/IBuyerRepository";

class InMemoryBuyerRepository implements IBuyerRepository {
  public readonly buyers: Buyer[] = [];

  public async getAll(): Promise<Buyer[]> {
    return this.buyers;
  }

  public async getById(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const buyer = this.buyers.find((buyer) => buyer.id === id);

    if (!buyer) {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async getByCpf(cpf: string): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const buyer = this.buyers.find((buyer) => buyer.cpf === cpf);

    if (!buyer) {
      return EBuyerResponse.BuyerNotFound;
    }

    return buyer;
  }

  public async create(name: string, cpf: string): Promise<Buyer | EBuyerResponse.CPFAlreadyExists> {
    const cpfExists = this.buyers.find((buyer) => buyer.cpf === cpf);

    if (cpfExists) {
      return EBuyerResponse.CPFAlreadyExists;
    }

    const buyer = {
      id: 1,
      name,
      cpf,
    };

    this.buyers.push(buyer);

    return buyer;
  }

  public async update(id: number, name: string): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const buyer = this.buyers.find((buyer) => buyer.id === id);

    if (!buyer) {
      return EBuyerResponse.BuyerNotFound;
    }

    buyer.name = name;

    return buyer;
  }

  public async delete(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound> {
    const buyer = this.buyers.find((buyer) => buyer.id === id);

    if (!buyer) {
      return EBuyerResponse.BuyerNotFound;
    }

    this.buyers.pop();

    return buyer;
  }
}

export { InMemoryBuyerRepository };
