import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('filmRatings')
export class FilmRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// ประกาศ Entity ด้วย TypeORM สำหรับแมปข้อมูลระหว่าง 
// class FilmRating กับตาราง filmRatings ในฐานข้อมูล (PostgreSQL) สำหรับฟีเจอร์ film rating