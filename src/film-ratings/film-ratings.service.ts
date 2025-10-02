import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
// import { CreateFilmRatingDto } from './dto/create-film-rating.dto';
// import { UpdateFilmRatingDto } from './dto/update-film-rating.dto';

@Injectable()
export class FilmRatingsService {
  // create(createFilmRatingDto: CreateFilmRatingDto) {
  //   return 'This action adds a new filmRating';
  // }

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  findAll() {
    return this.entityManager.query(`select * from filmRatings`);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} filmRating`;
  // }

  // update(id: number, updateFilmRatingDto: UpdateFilmRatingDto) {
  //   return `This action updates a #${id} filmRating`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} filmRating`;
  // }
}
