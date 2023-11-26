import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/controllers/movie.controller';
import { MovieModel } from 'src/models/movie.model';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])],
  controllers: [MovieController],
})
export class MovieModule {}
