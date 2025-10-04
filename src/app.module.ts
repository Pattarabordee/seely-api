import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmRatingsModule } from './film-ratings/film-ratings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './data-source';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthModule } from './auth/auth.module';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true, //ไม่ควรใช้กับ Database ของ Product จริง
      }),
    }),
    ConfigifyModule.forRootAsync(),
    FilmRatingsModule,
    GenresModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }, AppService],
})
export class AppModule {}
