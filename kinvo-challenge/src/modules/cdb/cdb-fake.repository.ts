import { Cdb } from "../cdb/entities/cdb.entity";
import { CreateCdbDto } from "./dto/create-cdb.dto";
import { CdbRepository } from "./cdb.interface";
import { Redemption } from "../redemption/entities/redemption.entity";
import { Application } from "../application/entities/application.entity";
import { User } from "../user/entities/user.entity";

class CdbDatabaseRepositoryMock implements CdbRepository {
  private readonly cdbs: Cdb[] = [];
  private readonly redemptions: Redemption[] = [];
  private readonly applications: Application[] = [];

  public async getById(id: number): Promise<Cdb | null> {
    const cdb = this.cdbs.find((cdb) => cdb.id === id);

    if (!cdb) return null;

    return cdb;
  }

  public async create(cdb: CreateCdbDto): Promise<Cdb> {
    const cdbCreated = {
      id: this.cdbs.length + 1,
      ...cdb,
      profit: 0,
      total: 0,
      redemptions: this.redemptions,
      applications: this.applications,
      user: new User(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.cdbs.push(cdbCreated);

    return cdbCreated;
  }

  public async update(cdb: Cdb): Promise<Cdb> {
    const cdbIndex = this.cdbs.findIndex((cdbFind) => cdbFind.id === cdb.id);

    this.cdbs[cdbIndex].name = cdb.name;

    return this.cdbs[cdbIndex];
  }
}

export { CdbDatabaseRepositoryMock };
