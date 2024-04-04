import { Failure, Success } from "../../errors/either";
import { CreatePixService } from "./CreatePixService";
import { InMemoryPixRepository } from "../../repositories/in-memory/InMemoryPixRepository";
import { it, describe, expect, beforeEach } from "vitest";

let pixRepository: InMemoryPixRepository;
let createPixService: CreatePixService;

describe("create Pix", () => {
  beforeEach(() => {
    pixRepository = new InMemoryPixRepository();
    createPixService = new CreatePixService(pixRepository);
  });

  it("should be able create a pix", async () => {
    const pix = await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    expect(pix.value).toEqual({
      id: 1,
      code_generated:
        "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      id_buyer: 1,
    });
    expect(pix).toBeInstanceOf(Success);
  });

  it("should not be able create a pix with same code", async () => {
    const pix = await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    const pixWithSameCode = await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    expect(pixWithSameCode.value).toHaveProperty("message");
    expect(pixWithSameCode.value.message).toBe("Esse código pix já existe");
    expect(pixWithSameCode).toBeInstanceOf(Failure);
  });

  it("should not be able create a pix if the buyer is not found", async () => {
    const pix = await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      2
    );

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 2");
    expect(pix).toBeInstanceOf(Failure);
  });

  it("should not be able create a pix if the code is not a string", async () => {
    const pix = await createPixService.execute(10, 2);

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("O código pix deve ser uma string");
    expect(pix).toBeInstanceOf(Failure);
  });

  it("should not be able create a pix if the buyer id has not been inserted", async () => {
    const pix = await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas"
    );

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("O ID é obrigatório");
    expect(pix).toBeInstanceOf(Failure);
    // });
  });
});
