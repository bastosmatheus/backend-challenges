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
import { GetAllRedemptionsByCdbService } from "./get-all-redemptions-by-cdb.service";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para buscar resgates de uma determinada cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let createRedemptionService: CreateRedemptionService;
  let getAllRedemptionsByCdbService: GetAllRedemptionsByCdbService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        CreateRedemptionService,
        GetAllRedemptionsByCdbService,
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
    getAllRedemptionsByCdbService = moduleRef.get(
      GetAllRedemptionsByCdbService
    );
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel buscar os resgates", async () => {
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

    await createRedemptionService.execute({
      amount: 20,
      cdb_id: 1,
    });

    const result = await getAllRedemptionsByCdbService.execute({ cdb_id: 1 });

    expect(result).toBeTruthy();
    expect(result).toHaveLength(2);
  });
});
