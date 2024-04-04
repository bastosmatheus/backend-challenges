import { Failure, Success } from "../../errors/either";
import { CreateCardService } from "./CreateCardService";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { it, describe, expect, beforeEach } from "vitest";

let cardRepository: InMemoryCardRepository;
let createCardService: CreateCardService;

describe("create card", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able create a card", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    const card = await createCardService.execute(
      "Matheus",
      "1234567890123456",
      "123",
      expirationDate,
      1
    );

    expect(card.value).toEqual({
      id: 1,
      card_holder_name: "Matheus",
      card_number: "1234567890123456",
      cvv: "123",
      expiration_date: new Date(2025, 4 - 1, 24),
      id_buyer: 1,
    });
    expect(card).toBeInstanceOf(Success);
  });

  it("should not be able create a card with same card number", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    const card = await createCardService.execute(
      "Matheus",
      "1234567890123456",
      "123",
      expirationDate,
      1
    );

    const cardWithSameCardNumber = await createCardService.execute(
      "Rogerio",
      "1234567890123456",
      "556",
      expirationDate,
      1
    );

    expect(cardWithSameCardNumber.value).toHaveProperty("message");
    expect(cardWithSameCardNumber.value.message).toBe("Esse número de cartão já existe");
    expect(cardWithSameCardNumber).toBeInstanceOf(Failure);
  });

  it("should not be able create a card if the buyer is not found", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);
    const card = await createCardService.execute(
      "Matheus",
      "1234567890123456",
      "123",
      expirationDate,
      2
    );

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 2");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able create a card if the holder name is not a string", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);
    const card = await createCardService.execute(10, "1234567890123456", "123", expirationDate, 1);

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O nome do titular deve ser uma string");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able create a card if the buyer id has not been inserted", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);
    const card = await createCardService.execute(
      "Matheus",
      "1234567890123456",
      "123",
      expirationDate
    );

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID é obrigatório");
    expect(card).toBeInstanceOf(Failure);
  });
});
