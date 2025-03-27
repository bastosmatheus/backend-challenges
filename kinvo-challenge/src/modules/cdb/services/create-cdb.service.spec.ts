import { Test } from "@nestjs/testing";
import { CreateCdbService } from "./create-cdb.service";
import { CdbDatabaseRepository } from "../cdb.repository";
import { CdbDatabaseRepositoryMock } from "../cdb-fake.repository";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para criação de um cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
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
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel criar um cdb (caixinha)", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    await updateMoneyService.execute({
      id: 1,
      amount: 2000,
    });

    const result = await createCdbService.execute({
      name: "Reserva de emergência",
      amount_initial: 2000,
      user_id: 1,
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel criar um cdb (caixinha) se o usuário não existe", async () => {
    expect(async () => {
      await createCdbService.execute({
        name: "Reserva de emergência",
        amount_initial: 2000,
        user_id: 1,
      });
    }).rejects.toThrow("Nenhum usuário encontrado");
  });
});
