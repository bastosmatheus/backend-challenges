import { Failure, Success } from "../../errors/either";
import { CreateBuyerService } from "./CreateBuyerService";
import { InMemoryBuyerRepository } from "../../repositories/in-memory/InMemoryBuyerRepository";
import { it, describe, expect, beforeEach } from "vitest";

let buyerRepository: InMemoryBuyerRepository;
let createBuyerService: CreateBuyerService;

describe("create buyer", () => {
  beforeEach(() => {
    buyerRepository = new InMemoryBuyerRepository();
    createBuyerService = new CreateBuyerService(buyerRepository);
  });

  it("should be able create a buyer", async () => {
    const buyer = await createBuyerService.execute("Matheus", "12345678901");

    expect(buyer.value).toEqual({
      id: 1,
      buyer_name: "Matheus",
      cpf: "12345678901",
    });
    expect(buyer).toBeInstanceOf(Success);
  });

  it("should not be able create a buyer with same cpf", async () => {
    const buyer = await createBuyerService.execute("Matheus", "12345678901");
    const buyerWithSameCpf = await createBuyerService.execute("Rogerio", "12345678901");

    expect(buyerWithSameCpf.value).toHaveProperty("message");
    expect(buyerWithSameCpf.value.message).toBe("Esse CPF já foi cadastrado");
    expect(buyerWithSameCpf).toBeInstanceOf(Failure);
  });

  it("should not be able create a buyer if the name is not a string", async () => {
    const buyer = await createBuyerService.execute(10, "12345678901");

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O nome do comprador deve ser uma string");
    expect(buyer).toBeInstanceOf(Failure);
  });

  it("should not be able create a buyer if the cpf is not a string", async () => {
    const buyer = await createBuyerService.execute("Matheus", 12345678901);

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O CPF do comprador deve ser uma string");
    expect(buyer).toBeInstanceOf(Failure);
  });
});
