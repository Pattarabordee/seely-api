
import { FilmRating } from '@app/film-ratings/entities/film-rating.entity';
import { Genres } from '@app/genres/entities/genre.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // เรื่องอะไร (text)

  @Column({ type: 'int' })
  year: number; // ปีไหน (number)

  @Column({ type: 'text' })
  review_description: string; // รายละเอียดการรีวิว (text)

  // @Column({ type: 'float' })
  // recommender_score: number; // คะแนนของผู้แนะนำ (number)

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Genres)
  @JoinColumn({ name: 'genres_id', referencedColumnName: 'id' })
  genres: Genres;

  @ManyToOne(() => FilmRating)
  @JoinColumn({ name: 'film_rating_id', referencedColumnName: 'id' })
  filmRating: FilmRating;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column({ type: 'float', default: 0 })
  avgRating: number;

  @Column({ type: 'int', default: 0 })
  ratingCount: number;
}
