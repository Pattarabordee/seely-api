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
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { IdDto } from '@app/common/dto/id.dto';

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
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
