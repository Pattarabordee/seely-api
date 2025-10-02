import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmRatingsModule } from './film-ratings/film-ratings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './data-source';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    FilmRatingsModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
