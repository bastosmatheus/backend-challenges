import { Failure, Success } from "../../errors/either";
import { CreatePixService } from "./CreatePixService";
import { GetPixByIdService } from "./GetPixByIdService";
import { InMemoryPixRepository } from "../../repositories/in-memory/InMemoryPixRepository";
import { it, describe, expect, beforeEach } from "vitest";

let pixRepository: InMemoryPixRepository;
let getPixById: GetPixByIdService;
let createPixService: CreatePixService;

describe("get Pix by id", () => {
  beforeEach(() => {
    pixRepository = new InMemoryPixRepository();
    getPixById = new GetPixByIdService(pixRepository);
    createPixService = new CreatePixService(pixRepository);
  });

  it("should be able get a pix by id", async () => {
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    const pix = await getPixById.execute(1);

    expect(pix.value).toHaveProperty("id");
    expect(pix).toBeInstanceOf(Success);
  });

  it("should not be able get a pix with id nonexistent", async () => {
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    const pix = await getPixById.execute(2);

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("Nenhum código pix foi encontrado com o ID: 2");
    expect(pix).toBeInstanceOf(Failure);
  });

  it("should not be able get a pix if the id is not a number", async () => {
    await createPixService.execute(
      "diaoqpjdpwlqpdolanckksp´zlxaopsjiojqwqodkopqdjabdaosjdpqdokwjqoi,dap.aplaoskqioiwqopcuethytgyryreuacikas",
      1
    );

    const pix = await getPixById.execute("12345678910");

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("O ID deve ser um número");
    expect(pix).toBeInstanceOf(Failure);
  });

  it("should not be able get a pix if the id has not been inserted", async () => {
    const pix = await getPixById.execute();

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("O ID é obrigatório");
    expect(pix).toBeInstanceOf(Failure);
  });

  it("should not be able get a Pix if the id is a number less than 1", async () => {
    const pix = await getPixById.execute(-1);

    expect(pix.value).toHaveProperty("message");
    expect(pix.value.message).toEqual("O ID não pode ser menor que 1");
    expect(pix).toBeInstanceOf(Failure);
  });
});
