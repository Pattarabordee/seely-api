import { Injectable } from '@nestjs/common';
import { Genres } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateGenreDto } from './dto/create-genre.dto';
// import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  // create(createGenreDto: CreateGenreDto) {
  //   return 'This action adds a new genre';
  // }

  constructor(
      @InjectRepository(Genres)
      private readonly repository: Repository<Genres>,
    ) {}

  findAll() {
    return this.repository.find(); 
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} genre`;
  // }

  // update(id: number, updateGenreDto: UpdateGenreDto) {
  //   return `This action updates a #${id} genre`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} genre`;
  // }
}
