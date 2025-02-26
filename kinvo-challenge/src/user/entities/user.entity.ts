import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: 0 })
  money: number;
}

export { User };
