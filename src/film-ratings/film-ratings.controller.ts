import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmRatingsService } from './film-ratings.service';
// import { CreateFilmRatingDto } from './dto/create-film-rating.dto';
// import { UpdateFilmRatingDto } from './dto/update-film-rating.dto';

@Controller('film-ratings')
export class FilmRatingsController {
  constructor(private readonly filmRatingsService: FilmRatingsService) {}

  // @Post()
  // create(@Body() createFilmRatingDto: CreateFilmRatingDto) {
  //   return this.filmRatingsService.create(createFilmRatingDto);
  // }

  @Get()
  findAll() {
    return this.filmRatingsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filmRatingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFilmRatingDto: UpdateFilmRatingDto) {
  //   return this.filmRatingsService.update(+id, updateFilmRatingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filmRatingsService.remove(+id);
  // }
}
