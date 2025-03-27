import { Test } from "@nestjs/testing";
import { CreateCdbService } from "./create-cdb.service";
import { CdbDatabaseRepository } from "../cdb.repository";
import { CdbDatabaseRepositoryMock } from "../cdb-fake.repository";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { GetCdbByIdService } from "./get-cdb-by-id.service";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para buscar um cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let getCdbByIdService: GetCdbByIdService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        GetCdbByIdService,
        UpdateMoneyService,
        {
          provide: CdbDatabaseRepository,
          useClass: CdbDatabaseRepositoryMock,
        },
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createCdbService = moduleRef.get(CreateCdbService);
    createUserService = moduleRef.get(CreateUserService);
    getCdbByIdService = moduleRef.get(GetCdbByIdService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel buscar um cdb (caixinha)", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    await updateMoneyService.execute({
      id: 1,
      amount: 2000,
    });

    await createCdbService.execute({
      name: "Reserva de emergência",
      amount_initial: 2000,
      user_id: 1,
    });

    const result = await getCdbByIdService.execute({
      id: 1,
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel buscar um cdb (caixinha) se a caixinha não existe (ID)", async () => {
    expect(async () => {
      await getCdbByIdService.execute({
        id: 19287319238,
      });
    }).rejects.toThrow("Nenhuma caixinha encontrada");
  });
});
