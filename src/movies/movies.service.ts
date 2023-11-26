import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  getByTitle(title: string) {
    return `This action returns all movies with the title containing: ${title}`;
  }

  getByDirector(director: string) {
    return `This action returns all movies directed by: ${director}`;
  }

  getByYear(year: number) {
    return `This action returns all movies from the year: ${year}`;
  }

  byNationality(nationality: string) {
    return `This action returns all movies from the nationality: ${nationality}`;
  }
}
