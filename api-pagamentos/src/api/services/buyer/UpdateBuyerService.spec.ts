import { Failure, Success } from "../../errors/either";
import { UpdateBuyerService } from "./UpdateBuyerService";
import { CreateBuyerService } from "./CreateBuyerService";
import { InMemoryBuyerRepository } from "../../repositories/in-memory/InMemoryBuyerRepository";
import { it, describe, expect, beforeEach } from "vitest";

let buyerRepository: InMemoryBuyerRepository;
let updateBuyerService: UpdateBuyerService;
let createBuyerService: CreateBuyerService;

describe("update buyer", () => {
  beforeEach(() => {
    buyerRepository = new InMemoryBuyerRepository();
    updateBuyerService = new UpdateBuyerService(buyerRepository);
    createBuyerService = new CreateBuyerService(buyerRepository);
  });

  it("should be able update a buyer", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await updateBuyerService.execute(1, "Lucio");

    expect(buyer.value).toStrictEqual({
      id: 1,
      buyer_name: "Lucio",
      cpf: "12345678901",
    });
    expect(buyer).toBeInstanceOf(Success);
  });

  it("should not be able update a buyer with id nonexistent", async () => {
    await createBuyerService.execute("Matheus", "12345678901");

    const buyer = await updateBuyerService.execute(2, "Tamanduá");

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 2");
    expect(buyer).toBeInstanceOf(Failure);
  });

  it("should not be able update a buyer if the id is not a number", async () => {
    const buyer = await updateBuyerService.execute("10", "12345678901");

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O ID deve ser um número");
    expect(buyer).toBeInstanceOf(Failure);
  });

  it("should not be able update a buyer if the name is not a string", async () => {
    const buyer = await updateBuyerService.execute(1, 12345678901);

    expect(buyer.value).toHaveProperty("message");
    expect(buyer.value.message).toEqual("O nome do comprador deve ser uma string");
    expect(buyer).toBeInstanceOf(Failure);
  });
});
