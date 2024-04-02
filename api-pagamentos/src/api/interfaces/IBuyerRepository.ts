type Buyer = {
  id: number;
  name: string;
  cpf: string;
};

enum EBuyerResponse {
  BuyerNotFound,
  CPFAlreadyExists,
}

interface IBuyerRepository {
  getAll(): Promise<Buyer[]>;
  getById(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound>;
  getByCpf(cpf: string): Promise<Buyer | EBuyerResponse.BuyerNotFound>;
  create(name: string, cpf: string): Promise<Buyer | EBuyerResponse.CPFAlreadyExists>;
  update(id: number, name: string): Promise<Buyer | EBuyerResponse.BuyerNotFound>;
  delete(id: number): Promise<Buyer | EBuyerResponse.BuyerNotFound>;
}

export { IBuyerRepository, EBuyerResponse, Buyer };
