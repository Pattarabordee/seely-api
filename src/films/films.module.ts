import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Rating])],
  controllers: [FilmsController],
  providers: [FilmsService, RatingService],
})
export class FilmsModule {}
