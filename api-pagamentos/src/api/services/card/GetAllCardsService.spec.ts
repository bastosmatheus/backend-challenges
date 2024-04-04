import { CreateCardService } from "./CreateCardService";
import { GetAllCardsService } from "./GetAllCardsService.ts";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { it, describe, expect, beforeEach } from "vitest";

let cardRepository: InMemoryCardRepository;
let getAllCardsService: GetAllCardsService;
let createCardService: CreateCardService;

describe("get all cards", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    getAllCardsService = new GetAllCardsService(cardRepository);
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able get all cards", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);
    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);
    await createCardService.execute("Lucas", "1234567890123450", "570", expirationDate, 1);
    await createCardService.execute("Andre", "1234567890123410", "321", expirationDate, 1);

    const card = await getAllCardsService.execute();

    expect(card.length).toBeGreaterThanOrEqual(3);
  });
});
