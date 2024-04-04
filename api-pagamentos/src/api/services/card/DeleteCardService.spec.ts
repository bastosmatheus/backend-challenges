import { Failure, Success } from "../../errors/either";
import { DeleteCardService } from "./DeleteCardService";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { it, describe, expect, beforeEach } from "vitest";
import { CreateCardService } from "./CreateCardService";

let cardRepository: InMemoryCardRepository;
let deleteCardService: DeleteCardService;
let createCardService: CreateCardService;

describe("delete card by id", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    deleteCardService = new DeleteCardService(cardRepository);
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able delete a card by id", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await deleteCardService.execute(1);

    expect(card.value).toHaveProperty("card_holder_name");
    expect(card).toBeInstanceOf(Success);
  });

  it("should not be able delete a card with id nonexistent", async () => {
    const card = await deleteCardService.execute(2);

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("Nenhum cartão foi encontrado com o ID: 2");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able delete a card with the id is not a number", async () => {
    const card = await deleteCardService.execute("12345678910");

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID deve ser um número");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able delete a card if the id has not been inserted", async () => {
    const card = await deleteCardService.execute();

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID é obrigatório");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able get a card if the id is a number less than 1", async () => {
    const card = await deleteCardService.execute(-1);

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID não pode ser menor que 1");
    expect(card).toBeInstanceOf(Failure);
  });
});
