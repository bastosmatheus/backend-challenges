import { Test } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { UserDatabaseRepository } from "../user.repository";
import { UserDatabaseRepositoryMock } from "../user-fake.repository";
import { GetUserByEmailService } from "./get-user-by-email.service";

describe("Teste unitário para buscar um usuário pelo email", () => {
  let createUserService: CreateUserService;
  let getUserByEmailService: GetUserByEmailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        GetUserByEmailService,
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
    getUserByEmailService = moduleRef.get(GetUserByEmailService);
  });

  it("Deve ser possivel buscar um usuário pelo email", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    const result = await getUserByEmailService.execute({
      email: "matheus@teste.com",
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel buscar um usuário se o usuário não existe (email)", async () => {
    expect(async () => {
      await getUserByEmailService.execute({
        email: "email@inexistente.com",
      });
    }).rejects.toThrow("Nenhum usuário encontrado");
  });
});
