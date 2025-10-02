import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmRatingsModule } from './film-ratings/film-ratings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
      }),
    }),
    FilmRatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
