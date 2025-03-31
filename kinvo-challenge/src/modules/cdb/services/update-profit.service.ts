import { Injectable } from "@nestjs/common";
import { CdbDatabaseRepository } from "../cdb.repository";
import { Cron } from "@nestjs/schedule";

@Injectable()
class UpdateProfitService {
  constructor(private readonly cdbDatabaseRepository: CdbDatabaseRepository) {}

  // Atualização no rendimento todos os dias as 12hrs
  @Cron("0 00 12 * * *", {
    name: "Atualização do rendimento do cdb (caixinha)",
    timeZone: "America/Sao_Paulo",
  })
  public async execute() {
    const cdbs = await this.cdbDatabaseRepository.getAll();
    const dailyCdi = this.calculateDailyCdi(0.1415);

    cdbs.forEach((cdb) => {
      const income = this.calculateDailyIncome(cdb.total, dailyCdi);

      cdb.total += Number(income.toFixed(2));
      cdb.profit += Number(income.toFixed(2));
    });
  }

  public calculateDailyCdi(
    annualCdi: number,
    cdiPercentage: number = 100
  ): number {
    // annualCdi = taxa anual do CDI (cálculo feito em decimal (0.1), não em porcentagem (1))

    // 252 dias úteis por ano - usado por convenção para calculo do cdi diário.
    const workingDaysYear = 252;

    // cálculo da taxa diária do CDI
    const dailyCdi = Math.pow(1 + annualCdi, 1 / workingDaysYear) - 1;

    // cáluco feito com o percentual de 100% de CDI (PADRÃO)
    return dailyCdi * (cdiPercentage / 100);
  }

  public calculateDailyIncome(valueTotal: number, dailyCdi: number): number {
    return valueTotal * dailyCdi;
  }
}

export { UpdateProfitService };
