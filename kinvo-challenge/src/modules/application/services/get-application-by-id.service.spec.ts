import { Test } from "@nestjs/testing";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { CreateCdbService } from "src/modules/cdb/services/create-cdb.service";
import { CdbDatabaseRepository } from "src/modules/cdb/cdb.repository";
import { CdbDatabaseRepositoryMock } from "src/modules/cdb/cdb-fake.repository";
import { CreateApplicationService } from "./create-application.service";
import { GetApplicationByIdService } from "./get-application-by-id.service";
import { ApplicationDatabaseRepository } from "../application.repository";
import { ApplicationDatabaseRepositoryMock } from "../application-fake.repository";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para buscar uma aplicação", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let createApplicationService: CreateApplicationService;
  let getApplicationByIdService: GetApplicationByIdService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        CreateApplicationService,
        GetApplicationByIdService,
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
    getApplicationByIdService = moduleRef.get(GetApplicationByIdService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel buscar uma aplicação", async () => {
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

    const result = await getApplicationByIdService.execute({ id: 1 });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel buscar uma aplicação se a aplicação não existe", async () => {
    expect(async () => {
      await getApplicationByIdService.execute({ id: 112893719 });
    }).rejects.toThrow("Nenhuma aplicação encontrada");
  });
});
