import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {

  constructor(@InjectRepository(Film) private repository: Repository<Film>) {}

  create(createFilmDto: CreateFilmDto, loggedInDto: LoggedInDto) {
    return this.repository.save({
      ...createFilmDto,
      user: { username: loggedInDto.username }
    });
  }

  findAll() {
    return `This action returns all films`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  async update(
    id: number,
    updateFilmDto: UpdateFilmDto,
    loggedInDto: LoggedInDto,
  ) {
    return this.repository
      .findOneByOrFail({ id, user: { username: loggedInDto.username } })            // ตรวจสอบก่อนว่ามี user และ id นี้ มั้ย
      .then(() => this.repository.save({ id, ...updateFilmDto }))                   // ถ้าหาเจอให้ save
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`);                         // ถ้าหาไม่เจอให้โยนทิ้งไป
      });
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
