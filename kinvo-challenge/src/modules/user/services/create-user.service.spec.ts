import { Test } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { UserDatabaseRepository } from "../user.repository";
import { UserDatabaseRepositoryMock } from "../user-fake.repository";

describe("Teste unitário para criação de um usuário", () => {
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
  });

  it("Deve ser possivel criar um usuário", async () => {
    const result = await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel criar um usuário se o email já está cadastrado", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    expect(async () => {
      await createUserService.execute({
        name: "Matheus22",
        email: "matheus@teste.com",
        password: "1234567",
      });
    }).rejects.toThrow("Usuário já cadastrado");
  });
});
