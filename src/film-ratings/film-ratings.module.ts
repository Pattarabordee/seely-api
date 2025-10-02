import { Module } from '@nestjs/common';
import { FilmRatingsService } from './film-ratings.service';
import { FilmRatingsController } from './film-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmRating } from './entities/film-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmRating])],
  controllers: [FilmRatingsController],
  providers: [FilmRatingsService],
})
export class FilmRatingsModule {}
