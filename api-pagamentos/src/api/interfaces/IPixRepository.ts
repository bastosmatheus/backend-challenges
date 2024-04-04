type Pix = {
  id: number;
  code_generated: string;
  id_buyer: number;
};

enum EPixResponse {
  PixNotFound,
  BuyerNotFound,
  CodeAlreadyExists,
}

interface IPixRepository {
  getAll(): Promise<Pix[]>;
  getById(id: number): Promise<Pix | EPixResponse.PixNotFound>;
  create(
    code_generated: string,
    id_buyer: number
  ): Promise<Pix | EPixResponse.CodeAlreadyExists | EPixResponse.BuyerNotFound>;
}

export { IPixRepository, EPixResponse, Pix };
