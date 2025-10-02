import { Injectable } from '@nestjs/common';
// import { CreateFilmRatingDto } from './dto/create-film-rating.dto';
// import { UpdateFilmRatingDto } from './dto/update-film-rating.dto';

@Injectable()
export class FilmRatingsService {
  // create(createFilmRatingDto: CreateFilmRatingDto) {
  //   return 'This action adds a new filmRating';
  // }

  findAll() {
    return `This action returns all filmRatings`;
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
