import { Test } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { UserDatabaseRepository } from "../user.repository";
import { UserDatabaseRepositoryMock } from "../user-fake.repository";
import { UpdateMoneyService } from "./update-money.service";

describe("Teste unitário para atualização de um usuário", () => {
  let createUserService: CreateUserService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        UpdateMoneyService,
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel atualizar um usuário", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    const result = await updateMoneyService.execute({
      id: 1,
      amount: 2000,
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel atualizar um usuário se o usuário não existe (ID)", async () => {
    expect(async () => {
      await updateMoneyService.execute({
        id: 139821738912,
        amount: 2000,
      });
    }).rejects.toThrow("Nenhum usuário encontrado");
  });
});
