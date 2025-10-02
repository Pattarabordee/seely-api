import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmRating } from './entities/film-rating.entity';
// import { CreateFilmRatingDto } from './dto/create-film-rating.dto';
// import { UpdateFilmRatingDto } from './dto/update-film-rating.dto';

@Injectable()
export class FilmRatingsService {
  // create(createFilmRatingDto: CreateFilmRatingDto) {
  //   return 'This action adds a new filmRating';
  // }

  constructor(
    @InjectRepository(FilmRating)
    private readonly repository: Repository<FilmRating>,
  ) {}

  findAll() {
    return this.repository.find();                                      //ใช้หา หรือ เก็บของจาก Database
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
