import { Test } from "@nestjs/testing";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { CreateCdbService } from "src/modules/cdb/services/create-cdb.service";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";
import { CdbDatabaseRepositoryMock } from "src/modules/cdb/cdb-fake.repository";
import { CreateApplicationService } from "./create-application.service";
import { GetAllApplicationsByCdbService } from "./get-all-applications-by-cdb.service";
import { ApplicationDatabaseRepository } from "../application.repository";
import { ApplicationDatabaseRepositoryMock } from "../application-fake.repository";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para buscar aplicações de uma determinada cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let createApplicationService: CreateApplicationService;
  let getAllApplicationsByCdbService: GetAllApplicationsByCdbService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        CreateApplicationService,
        GetAllApplicationsByCdbService,
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
          provide: ApplicationDatabaseRepository,
          useClass: ApplicationDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createCdbService = moduleRef.get(CreateCdbService);
    createUserService = moduleRef.get(CreateUserService);
    createApplicationService = moduleRef.get(CreateApplicationService);
    getAllApplicationsByCdbService = moduleRef.get(
      GetAllApplicationsByCdbService
    );
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel buscar as aplicações", async () => {
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

    await createApplicationService.execute({
      amount: 200,
      cdb_id: 1,
    });

    await createApplicationService.execute({
      amount: 20,
      cdb_id: 1,
    });

    const result = await getAllApplicationsByCdbService.execute({ cdb_id: 1 });

    expect(result).toBeTruthy();
    expect(result).toHaveLength(2);
  });
});
