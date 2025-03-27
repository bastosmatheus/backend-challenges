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
import { GetRedemptionByIdService } from "./get-redemption-by-id.service";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para buscar um resgate", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let createRedemptionService: CreateRedemptionService;
  let getRedemptionByIdService: GetRedemptionByIdService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        CreateRedemptionService,
        GetRedemptionByIdService,
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
    getRedemptionByIdService = moduleRef.get(GetRedemptionByIdService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel buscar um resgate", async () => {
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

    await createRedemptionService.execute({
      amount: 200,
      cdb_id: 1,
    });

    const result = await getRedemptionByIdService.execute({ id: 1 });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel buscar um resgate se o resgate não existe", async () => {
    expect(async () => {
      await getRedemptionByIdService.execute({ id: 112893719 });
    }).rejects.toThrow("Nenhum resgate encontrado");
  });
});
