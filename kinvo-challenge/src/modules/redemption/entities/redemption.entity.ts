import { Cdb } from "src/modules/cdb/entities/cdb.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("redemptions")
class Redemption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column()
  cdb_id: number;

  @ManyToOne(() => Cdb, (cdb) => cdb)
  @JoinColumn({ name: "cdb_id" })
  cdb: Cdb;

  @CreateDateColumn()
  created_at: Date;
}

export { Redemption };
