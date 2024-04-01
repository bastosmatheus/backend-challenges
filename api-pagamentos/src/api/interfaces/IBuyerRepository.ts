import { IBuyer } from "./IBuyer";

enum EBuyerResponse {
  BuyerNotFound,
  CPFAlreadyExists,
}

interface IBuyerRepository {
  getAll(): Promise<IBuyer[]>;
  findById(id: number): Promise<IBuyer | EBuyerResponse.BuyerNotFound>;
  findByCPF(cpf: string): Promise<IBuyer | EBuyerResponse.BuyerNotFound>;
  create(name: string, cpf: string): Promise<IBuyer | EBuyerResponse.CPFAlreadyExists>;
  update(id: number, name: string, cpf: string): Promise<IBuyer | EBuyerResponse.BuyerNotFound>;
  delete(id: number): Promise<IBuyer | EBuyerResponse.BuyerNotFound>;
}

export { IBuyerRepository, EBuyerResponse };
