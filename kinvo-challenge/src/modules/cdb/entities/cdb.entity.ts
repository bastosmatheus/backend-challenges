import { Application } from "src/modules/application/entities/application.entity";
import { Redemption } from "src/modules/redemption/entities/redemption.entity";
import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cdbs")
class Cdb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount_initial: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  profit: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => Redemption, (redemption) => redemption.cdb_id)
  redemptions: Redemption[];

  @OneToMany(() => Application, (application) => application.cdb_id)
  applications: Application[];

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.cdbs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Cdb };
