import { Test } from "@nestjs/testing";
import { CreateCdbService } from "./create-cdb.service";
import { CdbDatabaseRepository } from "../cdb.repository";
import { CdbDatabaseRepositoryMock } from "../cdb-fake.repository";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { UpdateCdbNameService } from "./update-cdb-name.service";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para atualização de um cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let updateCdbNameService: UpdateCdbNameService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        UpdateCdbNameService,
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
    updateCdbNameService = moduleRef.get(UpdateCdbNameService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel atualizar um cdb (caixinha)", async () => {
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

    const result = await updateCdbNameService.execute({
      id: 1,
      name: "Investimento",
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel atualizar um cdb (caixinha) se a caixinha não existe (ID)", async () => {
    expect(async () => {
      await updateCdbNameService.execute({
        id: 1918273891,
        name: "Investimento",
      });
    }).rejects.toThrow("Nenhuma caixinha encontrada");
  });
});
