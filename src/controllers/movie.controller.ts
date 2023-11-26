import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { MovieModel } from 'src/models/movie.model';
import { MovieSchema } from 'src/schemas/movie.schemas';

@Controller('/movie')
export class MovieController {
  constructor(
    @InjectRepository(MovieModel) private model: Repository<MovieModel>,
  ) {}

  @Post()
  public async create(
    @Body() body: MovieSchema,
  ): Promise<{ data: MovieModel }> {
    const movieCreated = await this.model.save(body);
    return { data: movieCreated };
  }

  @Get(':id')
  public async getOne(@Param('id') id: number): Promise<{ data: MovieModel }> {
    const movie = await this.model.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`No movie with this id was found!`);
    }
    return { data: movie };
  }

  @Get()
  public async getAll(): Promise<{ data: MovieModel[] }> {
    const movieList = await this.model.find();
    return { data: movieList };
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() body: MovieSchema,
  ): Promise<{ data: MovieModel }> {
    const movie = await this.model.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`No movie with this id was found.`);
    }

    await this.model.update(id, body);

    return { data: await this.model.findOne({ where: { id } }) };
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<{ data: string }> {
    const movie = await this.model.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`No movie with this id was found.`);
    }
    await this.model.delete(id);
    return { data: `Movie id:${id} has been successfully deleted!` };
  }

  @Get('byName/:name')
  public async getByTitle(
    @Param('name') name: string,
  ): Promise<{ data: MovieModel[] }> {
    const movies = await this.model.find({
      where: { title: ILike(`%${name}%`) },
    });
    if (movies.length === 0) {
      throw new NotFoundException(`No movies with this name were found!`);
    }
    return { data: movies };
  }

  @Get('byYear/:year')
  public async getByYear(
    @Param('year') year: number,
  ): Promise<{ data: MovieModel[] }> {
    const movies = await this.model.find({ where: { year } });
    if (movies.length === 0) {
      throw new NotFoundException(`No movies from this year were found!`);
    }
    return { data: movies };
  }

  @Get('byDirector/:director')
  public async getByDirector(
    @Param('director') director: string,
  ): Promise<{ data: MovieModel[] }> {
    const movies = await this.model.find({
      where: { director: ILike(`%${director}%`) },
    });
    if (movies.length === 0) {
      throw new NotFoundException(`No movies by this director were found!`);
    }
    return { data: movies };
  }
}
