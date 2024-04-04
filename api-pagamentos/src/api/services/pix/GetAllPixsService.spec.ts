import { CreatePixService } from "./CreatePixService.ts";
import { GetAllPixsService } from "./GetAllPixsService.ts";
import { InMemoryPixRepository } from "../../repositories/in-memory/InMemoryPixRepository.ts";
import { it, describe, expect, beforeEach } from "vitest";

let pixRepository: InMemoryPixRepository;
let getAllPixsService: GetAllPixsService;
let createPixService: CreatePixService;

describe("get all pixs", () => {
  beforeEach(() => {
    pixRepository = new InMemoryPixRepository();
    getAllPixsService = new GetAllPixsService(pixRepository);
    createPixService = new CreatePixService(pixRepository);
  });

  it("should be able get all pixs", async () => {
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaasdasdaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjdwqeqrqwiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqascacsxodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    const pix = await getAllPixsService.execute();

    expect(pix.length).toBeGreaterThanOrEqual(3);
  });
});
