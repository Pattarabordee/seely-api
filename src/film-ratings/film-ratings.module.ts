import { Module } from '@nestjs/common';
import { FilmRatingsService } from './film-ratings.service';
import { FilmRatingsController } from './film-ratings.controller';

@Module({
  controllers: [FilmRatingsController],
  providers: [FilmRatingsService],
})
export class FilmRatingsModule {}
