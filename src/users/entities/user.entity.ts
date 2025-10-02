import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()               //Auto-increment
  id: number;

  @Column({
    unique: true,
    nullable: false,                         // user ต้อง unique ไม่ซ้ำ
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
    default: Role.USER,
  })
  role: Role;
}
