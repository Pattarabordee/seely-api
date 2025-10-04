import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';

const paginateConfig: PaginateConfig<Film> = {
  //  กำหนดว่า Column ไหนที่ต้องการให้ใช้ Paginate ด้วยได้
  sortableColumns: [
    'id',
    'title',
    'avgRating',
    'ratingCount',
    'year',
    'genres',
    'filmRating',
  ],
  searchableColumns: ['title'],
};

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film) private repository: Repository<Film>) {}

  create(createFilmDto: CreateFilmDto, loggedInDto: LoggedInDto) {
    return this.repository.save({
      ...createFilmDto,
      user: { username: loggedInDto.username },
    });
  }

  private queryTemplate() {
    return this.repository
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.genres', 'genres')
      .leftJoinAndSelect('film.filmRating', 'filmRating')
      .leftJoin('film.user', 'user')
      .addSelect('user.id')
      .addSelect('user.username')
      .addSelect('user.role');
  }

  async search(query: PaginateQuery) {
    const page = await paginate<Film>(
      query, // limit, page ,sort
      this.queryTemplate(),
      paginateConfig,
    );

    return {
      data: page.data,
      meta: page.meta,
    };
  }

  findOne(id: number) {
    return this.queryTemplate().where('film.id = :id', { id }).getOne();
  }

  async update(
    id: number,
    updateFilmDto: UpdateFilmDto,
    loggedInDto: LoggedInDto,
  ) {
    return this.repository
      .findOneByOrFail({ id, user: { username: loggedInDto.username } }) // ตรวจสอบก่อนว่ามี user และ id นี้ มั้ย
      .then(() => this.repository.save({ id, ...updateFilmDto })) // ถ้าหาเจอให้ save
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`); // ถ้าหาไม่เจอให้โยนทิ้งไป
      });
  }

  remove(id: number, loggedInDto: LoggedInDto) {
    return this.repository
      .findOneByOrFail({ id, user: { username: loggedInDto.username } })
      .then(() => this.repository.delete({ id }))
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`);
      });
  }
}
