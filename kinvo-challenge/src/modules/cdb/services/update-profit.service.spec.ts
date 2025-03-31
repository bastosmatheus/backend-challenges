import { Test } from "@nestjs/testing";
import { CreateCdbService } from "./create-cdb.service";
import { CdbDatabaseRepository } from "../cdb.repository";
import { CdbDatabaseRepositoryMock } from "../cdb-fake.repository";
import { CreateUserService } from "src/modules/user/services/create-user.service";
import { UserDatabaseRepository } from "src/modules/user/user.repository";
import { UserDatabaseRepositoryMock } from "src/modules/user/user-fake.repository";
import { UpdateProfitService } from "./update-profit.service";
import { UpdateMoneyService } from "src/modules/user/services/update-money.service";

describe("Teste unitário para atualização do valor total + rendimentos de um cdb (caixinha)", () => {
  let createUserService: CreateUserService;
  let createCdbService: CreateCdbService;
  let updateProfitService: UpdateProfitService;
  let updateMoneyService: UpdateMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCdbService,
        CreateUserService,
        UpdateProfitService,
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
    updateProfitService = moduleRef.get(UpdateProfitService);
    updateMoneyService = moduleRef.get(UpdateMoneyService);
  });

  it("Deve ser possivel atualizar o valor total + rendimentos de um cdb (caixinha)", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@teste.com",
      password: "1234567",
    });

    await updateMoneyService.execute({
      id: 1,
      amount: 2000,
    });

    const cdb = await createCdbService.execute({
      name: "Reserva de emergência",
      amount_initial: 2000,
      user_id: 1,
    });

    await updateProfitService.execute();

    // se o total estiver atualizado (maior que o valor inicial do cdb),
    // é por que o service de atualização do rendimento funcionou
    expect(cdb.total).toBeGreaterThan(cdb.amount_initial);
  });
});
