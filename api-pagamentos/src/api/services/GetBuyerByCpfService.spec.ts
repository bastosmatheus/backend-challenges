import { Failure, Success } from "../errors/either";
import { CreateBuyerService } from "./CreateBuyerService";
import { GetBuyerByCpfService } from "./GetBuyerByCpfService";
import { InMemoryBuyerRepository } from "../repositories/in-memory/InMemoryBuyerRepository";
import { it, describe, expect, beforeEach } from "vitest";

let buyerRepository: InMemoryBuyerRepository;
let getBuyerByCpfService: GetBuyerByCpfService;
let createBuyerService: CreateBuyerService;

describe("get buyer by cpf", () => {
  beforeEach(() => {
    buyerRepository = new InMemoryBuyerRepository();
    getBuyerByCpfService = new GetBuyerByCpfService(buyerRepository);
    createBuyerService = new CreateBuyerService(buyerRepository);
  });

  it("should be able get a buyer by cpf", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await getBuyerByCpfService.execute("12345678901");

    expect(buyer.value).toHaveProperty("id");
    expect(buyer).toBeInstanceOf(Success);
  });

  it("should not be able get a buyer with cpf nonexistent", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await getBuyerByCpfService.execute("12345678910");

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("Nenhum comprador foi encontrado com o CPF: 12345678910");
    expect(buyer).toBeInstanceOf(Failure);
  });

  it("should not be able get a buyer with the cpf is not a string", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await getBuyerByCpfService.execute(12345678910);

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O CPF do comprador deve ser uma string");
    expect(buyer).toBeInstanceOf(Failure);
  });
});
