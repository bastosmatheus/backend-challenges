import { Cdb } from "src/modules/cdb/entities/cdb.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("applications")
class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => {
        if (!value) return 0;

        return Number(Number(value).toFixed(2));
      },
      from: (value: string) => parseFloat(value),
    },
  })
  amount: number;

  @Column()
  cdb_id: number;

  @ManyToOne(() => Cdb, (cdb) => cdb)
  @JoinColumn({ name: "cdb_id" })
  cdb: Cdb;

  @CreateDateColumn()
  created_at: Date;
}

export { Application };
