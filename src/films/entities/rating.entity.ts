import { User } from '@app/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Film } from './film.entity';


@Entity('ratings')
@Unique(['user', 'film']) // user can rate a recipe only once
export class Rating {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 1 })
  score: number;

  @ManyToOne(() => Film, { nullable: false })
  @JoinColumn({ name: 'film_id', referencedColumnName: 'id' })
  film: Film;


  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;
}