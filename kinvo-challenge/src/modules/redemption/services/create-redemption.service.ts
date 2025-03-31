import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RedemptionDatabaseRepository } from "../redemption.repository";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";
import { UserDatabaseRepository } from "src/modules/user/user.repository";

type CreateRedemptionServiceRequest = {
  amount: number;
  cdb_id: number;
};

@Injectable()
class CreateRedemptionService {
  constructor(
    private readonly redemptionDatabaseRepository: RedemptionDatabaseRepository,
    private readonly cdbDatabaseRepository: CdbDatabaseRepository,
    private readonly userDatabaseRepository: UserDatabaseRepository
  ) {}

  public async execute({ amount, cdb_id }: CreateRedemptionServiceRequest) {
    const cdbExists = await this.cdbDatabaseRepository.getById(cdb_id);

    if (!cdbExists) {
      throw new NotFoundException("Nenhuma caixinha encontrada");
    }

    const isNotPossibleRedeem = cdbExists.total - amount < 0;

    if (isNotPossibleRedeem) {
      throw new BadRequestException("Saldo insuficiente");
    }

    const diff = await this.calculateDiffDates(cdbExists.created_at);
    let taxes = 0;

    if (diff <= 12) {
      taxes = cdbExists.profit * 0.225;
    }

    if (diff <= 24) {
      taxes = cdbExists.profit * 0.185;
    }

    if (diff > 24) {
      taxes = cdbExists.profit * 0.15;
    }

    // reseta o lucro caso a quantia a resgatar seja maior que o rendimento
    const amountIsGreatherThanProfit =
      amount > cdbExists.profit
        ? (cdbExists.profit = 0)
        : (cdbExists.profit -= amount);

    const userExists = await this.userDatabaseRepository.getById(
      cdbExists.user_id
    );

    if (!userExists) {
      throw new NotFoundException("Nenhum usuário encontrado");
    }

    cdbExists.total -= amount - taxes;
    userExists.money += amount - taxes;

    await this.cdbDatabaseRepository.update(cdbExists);
    await this.userDatabaseRepository.updateMoney(userExists);

    const redemption = await this.redemptionDatabaseRepository.create({
      amount,
      cdb_id,
    });

    return redemption;
  }

  private async calculateDiffDates(createdAtDate: Date) {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const createdAtYear = createdAtDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const createdAtMonth = createdAtDate.getMonth();

    const currentDay = currentDate.getDate();
    const createdAtDay = createdAtDate.getDate();

    const yearsDiff = currentYear - createdAtYear;
    const monthsDiff = currentMonth - createdAtMonth;

    let dateDiff = yearsDiff * 12 + monthsDiff;

    if (currentDay < createdAtDay) {
      dateDiff--;
    }

    return dateDiff;
  }
}

export { CreateRedemptionService };
