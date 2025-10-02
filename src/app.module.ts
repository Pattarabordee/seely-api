import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmRatingsModule } from './film-ratings/film-ratings.module';

@Module({
  imports: [FilmRatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
