import { Test } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { UserDatabaseRepository } from "../user.repository";
import { UserDatabaseRepositoryMock } from "../user-fake.repository";
import { GetUserByIdService } from "./get-user-by-id.service";

describe("Teste unitário para buscar um usuário pelo ID", () => {
  let createUserService: CreateUserService;
  let getUserByIdService: GetUserByIdService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        GetUserByIdService,
        {
          provide: UserDatabaseRepository,
          useClass: UserDatabaseRepositoryMock,
        },
      ],
    }).compile();

    createUserService = moduleRef.get(CreateUserService);
    getUserByIdService = moduleRef.get(GetUserByIdService);
  });

  it("Deve ser possivel buscar um usuário pelo ID", async () => {
    await createUserService.execute({
      name: "Natheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    const result = await getUserByIdService.execute({ id: 1 });

    expect(result).toBeTruthy();
  });

  it("Não deve ser possivel buscar um usuário se o usuário não existe (ID)", async () => {
    expect(async () => {
      await getUserByIdService.execute({
        id: 1982371823,
      });
    }).rejects.toThrow("Nenhum usuário encontrado");
  });
});
