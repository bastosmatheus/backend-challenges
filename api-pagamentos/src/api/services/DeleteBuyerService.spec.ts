import { Failure, Success } from "../errors/either";
import { CreateBuyerService } from "./CreateBuyerService";
import { DeleteBuyerService } from "./DeleteBuyerService";
import { InMemoryBuyerRepository } from "../repositories/in-memory/InMemoryBuyerRepository";
import { it, describe, expect, beforeEach } from "vitest";

let buyerRepository: InMemoryBuyerRepository;
let deleteBuyerService: DeleteBuyerService;
let createBuyerService: CreateBuyerService;

describe("delete buyer by id", () => {
  beforeEach(() => {
    buyerRepository = new InMemoryBuyerRepository();
    deleteBuyerService = new DeleteBuyerService(buyerRepository);
    createBuyerService = new CreateBuyerService(buyerRepository);
  });

  it("should be able delete a buyer by id", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await deleteBuyerService.execute(1);

    expect(buyer.value).toHaveProperty("id");
    expect(buyer).toBeInstanceOf(Success);
  });

  it("should not be able delete a buyer with id nonexistent", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await deleteBuyerService.execute(2);

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 2");
    expect(buyer).toBeInstanceOf(Failure);
  });

  it("should not be able delete a buyer with the id is not a number", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await deleteBuyerService.execute("12345678910");

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O ID deve ser um número");
    expect(buyer).toBeInstanceOf(Failure);
  });
});
