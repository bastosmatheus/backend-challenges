import { Failure, Success } from "../../errors/either";
import { CreateCardService } from "./CreateCardService";
import { GetCardByIdService } from "./GetCardByIdService";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { it, describe, expect, beforeEach } from "vitest";

let cardRepository: InMemoryCardRepository;
let getCardById: GetCardByIdService;
let createCardService: CreateCardService;

describe("get card by id", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    getCardById = new GetCardByIdService(cardRepository);
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able get a card by id", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await getCardById.execute(1);

    expect(card.value).toHaveProperty("id");
    expect(card).toBeInstanceOf(Success);
  });

  it("should not be able get a card with id nonexistent", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await getCardById.execute(2);

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("Nenhum cartão foi encontrado com o ID: 2");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able get a card with the id is not a number", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await getCardById.execute("12345678910");

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID deve ser um número");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able get a card if the id has not been inserted", async () => {
    const card = await getCardById.execute();

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID é obrigatório");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able get a card if the id is a number less than 1", async () => {
    const card = await getCardById.execute(-1);

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID não pode ser menor que 1");
    expect(card).toBeInstanceOf(Failure);
  });
});
