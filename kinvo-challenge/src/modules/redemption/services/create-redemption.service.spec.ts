import { Test } from "@nestjs/testing";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { CreateCdbService } from "src/modules/cdb/services/create-cdb.service";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";
import { CdbDatabaseRepositoryMock } from "src/modules/cdb/cdb-fake.repository";
import { CreateRedemptionService } from "./create-redemption.service";
import { RedemptionDatabaseRepository } from "../redemption.repository";
import { RedemptionDatabaseRepositoryMock } from "../redemption-fake.repository";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para criação de um resgate", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let createRedemptionService: CreateRedemptionService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        CreateRedemptionService,
        UpdateMoneyService,
        {
          provide: CdbDatabaseRepository,
          useClass: CdbDatabaseRepositoryMock,
        },
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
        {
          provide: RedemptionDatabaseRepository,
          useClass: RedemptionDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createCdbService = moduleRef.get(CreateCdbService);
    createUserService = moduleRef.get(CreateUserService);
    createRedemptionService = moduleRef.get(CreateRedemptionService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel criar um resgate", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    await updateMoneyService.execute({
      id: 1,
      amount: 2500,
    });

    await createCdbService.execute({
      name: "Reserva de emergência",
      amount_initial: 2000,
      user_id: 1,
    });

    const result = await createRedemptionService.execute({
      amount: 200,
      cdb_id: 1,
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel criar um resgate se o valor de resgate for maior que o saldo", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    await updateMoneyService.execute({
      id: 1,
      amount: 2500,
    });

    await createCdbService.execute({
      name: "Reserva de emergência",
      amount_initial: 2000,
      user_id: 1,
    });

    expect(async () => {
      await createRedemptionService.execute({
        amount: 25000,
        cdb_id: 1,
      });
    }).rejects.toThrow("Saldo insuficiente");
  });

  it("Não deve ser possivel criar um resgate se o cdb (caixinha) não existe", async () => {
    expect(async () => {
      await createRedemptionService.execute({
        amount: 200,
        cdb_id: 1298137189,
      });
    }).rejects.toThrow("Nenhuma caixinha encontrada");
  });
});
