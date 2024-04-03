import { CreateBuyerService } from "./CreateBuyerService";
import { GetAllBuyersService } from "../buyer/GetAllBuyersService";
import { InMemoryBuyerRepository } from "../../repositories/in-memory/InMemoryBuyerRepository";
import { it, describe, expect, beforeEach } from "vitest";

let buyerRepository: InMemoryBuyerRepository;
let getAllBuyersService: GetAllBuyersService;
let createBuyerService: CreateBuyerService;

describe("get all buyers", () => {
  beforeEach(() => {
    buyerRepository = new InMemoryBuyerRepository();
    getAllBuyersService = new GetAllBuyersService(buyerRepository);
    createBuyerService = new CreateBuyerService(buyerRepository);
  });

  it("should be able get all buyers", async () => {
    await createBuyerService.execute("Matheus", "12345678901");
    await createBuyerService.execute("Matheus", "12345678910");

    const buyers = await getAllBuyersService.execute();

    expect(buyers.length).toBeGreaterThanOrEqual(2);
  });
});
