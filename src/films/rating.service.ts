import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RatingDto } from './dto/rating.dto';
import { Film } from './entities/film.entity';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(private datasource: DataSource) {}

  async rate(
    filmId: number,
    ratingDto: RatingDto,
    loggedInDto: LoggedInDto,
  ) {
    // create transaction
    return this.datasource.transaction(async (entityManager) => {
      const ratingRepository = entityManager.getRepository(Rating);
      const filmRepository = entityManager.getRepository(Film);

      // upsert rating
      const keys = {
        film: { id: filmId },
        user: { username: loggedInDto.username },
      };
      await ratingRepository
        .upsert(
          { score: ratingDto.score, ...keys },
          { conflictPaths: ['film', 'user'] },
        )
        .catch(() => {
          throw new NotFoundException(`Not found: id=${filmId}`);
        });

      // query last avg & count
      const { avg, count } = await ratingRepository
        .createQueryBuilder('rating')
        .select('AVG(rating.score)', 'avg')
        .addSelect('COUNT(rating.id)', 'count')
        .where('rating.film_id = :filmId', { filmId })
        .getRawOne();

      // update Film
      await filmRepository.update(filmId, {
        avgRating: parseFloat(avg),
        ratingCount: parseInt(count, 10),
      });

      return filmRepository.findOneBy({ id: filmId });
    });
  }
}
