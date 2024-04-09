import { beforeEach, describe, expect, it } from "vitest";
import { CreateCardService } from "./CreateCardService";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { GetCardsByBuyerService } from "./GetCardsByBuyerService";
import { Failure, Success } from "../../errors/either";

let cardRepository: InMemoryCardRepository;
let getCardsByBuyerService: GetCardsByBuyerService;
let createCardService: CreateCardService;

describe("get cards by buyer", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    getCardsByBuyerService = new GetCardsByBuyerService(cardRepository);
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able get cards by id buyer", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Ronaldinho", "1234567890123400", "321", expirationDate, 1);

    const cards = await getCardsByBuyerService.execute(1);

    expect(cards.value.length).toBeGreaterThanOrEqual(2);
    expect(cards).toBeInstanceOf(Success);
  });

  it("should not be able get cards with id buyer nonexistent", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Ronaldinho", "1234567890123400", "321", expirationDate, 1);

    const cards = await getCardsByBuyerService.execute(10);

    expect(cards.value).toHaveProperty("message");
    expect(cards.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 10");
    expect(cards).toBeInstanceOf(Failure);
  });

  it("should not be able get cards if the id buyer has not been inserted", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Ronaldinho", "1234567890123400", "321", expirationDate, 1);

    const cards = await getCardsByBuyerService.execute();

    expect(cards.value).toHaveProperty("message");
    expect(cards.value.message).toEqual("O ID do comprador é obrigatório");
    expect(cards).toBeInstanceOf(Failure);
  });

  it("should not be able get cards if the id buyer is not a number", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Ronaldinho", "1234567890123400", "321", expirationDate, 1);

    const cards = await getCardsByBuyerService.execute("ronaldo");

    expect(cards.value).toHaveProperty("message");
    expect(cards.value.message).toEqual("O ID do comprador deve ser um número");
    expect(cards).toBeInstanceOf(Failure);
  });

  it("should not be able get cards if the id buyer is a number less than 1", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Ronaldinho", "1234567890123400", "321", expirationDate, 1);

    const cards = await getCardsByBuyerService.execute(0);

    expect(cards.value).toHaveProperty("message");
    expect(cards.value.message).toEqual("O ID do comprador não pode ser menor que 1");
    expect(cards).toBeInstanceOf(Failure);
  });
});
