import { beforeEach, describe, expect, it } from "vitest";
import { CreatePixService } from "./CreatePixService";
import { Failure, Success } from "../../errors/either";
import { InMemoryPixRepository } from "../../repositories/in-memory/InMemoryPixRepository";
import { GetPixsByBuyerService } from "./GetPixsByBuyerService";

let pixRepository: InMemoryPixRepository;
let getPixsByBuyerService: GetPixsByBuyerService;
let createPixService: CreatePixService;

describe("get pixs by buyer", () => {
  beforeEach(() => {
    pixRepository = new InMemoryPixRepository();
    getPixsByBuyerService = new GetPixsByBuyerService(pixRepository);
    createPixService = new CreatePixService(pixRepository);
  });

  it("should be able get pixs by id buyer", async () => {
    await createPixService.execute(
      "MATHEUSCONFEITARIA12390819302KADOMDOAM,SQIONMSIOQKWD1234567890123456",
      1
    );
    await createPixService.execute(
      "RONALDINHODEVFULLSTACK9IUD9IAKJDWOIMIOJAWJD9Q0I1234567890123400",
      1
    );

    const pixs = await getPixsByBuyerService.execute(1);

    expect(pixs.value.length).toBeGreaterThanOrEqual(2);
    expect(pixs).toBeInstanceOf(Success);
  });

  it("should not be able get pixs with id buyer nonexistent", async () => {
    await createPixService.execute(
      "MATHEUSCONFEITARIA12390819302KADOMDOAM,SQIONMSIOQKWD1234567890123456",
      1
    );
    await createPixService.execute(
      "RONALDINHODEVFULLSTACK9IUD9IAKJDWOIMIOJAWJD9Q0I1234567890123400",
      1
    );

    const pixs = await getPixsByBuyerService.execute(10);

    expect(pixs.value).toHaveProperty("message");
    expect(pixs.value.message).toEqual("Nenhum comprador foi encontrado com o ID: 10");
    expect(pixs).toBeInstanceOf(Failure);
  });

  it("should not be able get pixs if the id buyer has not been inserted", async () => {
    await createPixService.execute(
      "MATHEUSCONFEITARIA12390819302KADOMDOAM,SQIONMSIOQKWD1234567890123456",
      1
    );
    await createPixService.execute(
      "RONALDINHODEVFULLSTACK9IUD9IAKJDWOIMIOJAWJD9Q0I1234567890123400",
      1
    );

    const pixs = await getPixsByBuyerService.execute();

    expect(pixs.value).toHaveProperty("message");
    expect(pixs.value.message).toEqual("O ID do comprador é obrigatório");
    expect(pixs).toBeInstanceOf(Failure);
  });

  it("should not be able get pixs if the id buyer is not a number", async () => {
    await createPixService.execute(
      "MATHEUSCONFEITARIA12390819302KADOMDOAM,SQIONMSIOQKWD1234567890123456",
      1
    );
    await createPixService.execute(
      "RONALDINHODEVFULLSTACK9IUD9IAKJDWOIMIOJAWJD9Q0I1234567890123400",
      1
    );

    const pixs = await getPixsByBuyerService.execute("ronaldo");

    expect(pixs.value).toHaveProperty("message");
    expect(pixs.value.message).toEqual("O ID do comprador deve ser um número");
    expect(pixs).toBeInstanceOf(Failure);
  });

  it("should not be able get pixs if the id buyer is a number less than 1", async () => {
    await createPixService.execute(
      "MATHEUSCONFEITARIA12390819302KADOMDOAM,SQIONMSIOQKWD1234567890123456",
      1
    );
    await createPixService.execute(
      "RONALDINHODEVFULLSTACK9IUD9IAKJDWOIMIOJAWJD9Q0I1234567890123400",
      1
    );

    const pixs = await getPixsByBuyerService.execute(0);

    expect(pixs.value).toHaveProperty("message");
    expect(pixs.value.message).toEqual("O ID do comprador não pode ser menor que 1");
    expect(pixs).toBeInstanceOf(Failure);
  });
});
