import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { IdDto } from '@app/common/dto/id.dto';
import * as nestjsPaginate from 'nestjs-paginate';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createFilmDto: CreateFilmDto,
    @Req() req: { user: LoggedInDto },
  ) {
    return this.filmsService.create(createFilmDto, req.user);
  }

  @Get()
  search(@nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery) {
    return this.filmsService.search(query);
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.filmsService.findOne(idDto.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param() idDto: IdDto,
    @Body() updateFilmDto: UpdateFilmDto,
    @Req() req: { user: LoggedInDto },
  ) {
    return this.filmsService.update(idDto.id, updateFilmDto, req.user);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() idDto: IdDto, @Req() req: { user: LoggedInDto }) {
    this.filmsService.remove(idDto.id, req.user);
  }
}
