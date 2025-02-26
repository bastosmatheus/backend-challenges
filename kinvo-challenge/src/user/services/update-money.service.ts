import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDatabaseRepository } from "../user.repository";

type UpdateMoneyServiceRequest = {
  id: number;
  amount: number;
};

@Injectable()
class UpdateMoneyService {
  constructor(
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ id, amount }: UpdateMoneyServiceRequest) {
    const userExists = await this.userDatabaseRepository.getById(id);

    if (!userExists) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    userExists.money += amount;

    const user = await this.userDatabaseRepository.updateMoney(userExists);

    return user;
  }
}

export { UpdateMoneyService };
