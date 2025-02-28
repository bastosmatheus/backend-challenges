import { Cdb } from "src/modules/cdb/entities/cdb.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  money: number;

  @OneToMany(() => Cdb, (cdb) => cdb.user_id)
  cbds: Cdb[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { User };
