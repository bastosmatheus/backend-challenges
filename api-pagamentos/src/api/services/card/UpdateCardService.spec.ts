import { Failure, Success } from "../../errors/either";
import { UpdateCardService } from "./UpdateCardService";
import { CreateCardService } from "./CreateCardService";
import { InMemoryCardRepository } from "../../repositories/in-memory/InMemoryCardRepository";
import { it, describe, expect, beforeEach } from "vitest";

let cardRepository: InMemoryCardRepository;
let updateCardService: UpdateCardService;
let createCardService: CreateCardService;

describe("update card", () => {
  beforeEach(() => {
    cardRepository = new InMemoryCardRepository();
    updateCardService = new UpdateCardService(cardRepository);
    createCardService = new CreateCardService(cardRepository);
  });

  it("should be able update a card", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await updateCardService.execute(1, "Rogerio", "532", new Date(2025, 4 - 1, 8));

    expect(card.value).toStrictEqual({
      id: 1,
      card_holder_name: "Rogerio",
      card_number: "1234567890123456",
      cvv: "532",
      expiration_date: new Date(2025, 4 - 1, 8),
      id_buyer: 1,
    });
    expect(card).toBeInstanceOf(Success);
  });

  it("should not be able update a card with id nonexistent", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await updateCardService.execute(2, "Rogerio", "532", new Date(2025, 4 - 1, 8));

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("Nenhum cartão foi encontrado com o ID: 2");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able update a card if the id is not a number", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await updateCardService.execute("alo", "Rogerio", "532", new Date(2025, 4 - 1, 8));

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O ID deve ser um número");
    expect(card).toBeInstanceOf(Failure);
  });

  it("should not be able update a card if the cvv is not a string", async () => {
    const expirationDate = new Date(2025, 4 - 1, 24);

    await createCardService.execute("Matheus", "1234567890123456", "123", expirationDate, 1);

    const card = await updateCardService.execute(1, "Tamandua", 157, new Date(2025, 4 - 1, 18));

    expect(card.value).toHaveProperty("message");
    expect(card.value.message).toEqual("O CVV do cartão deve ser uma string");
    expect(card).toBeInstanceOf(Failure);
  });
});
