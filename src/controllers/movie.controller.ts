import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Get,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MovieModel } from 'src/models/movie.model';
import { AuthGuard } from 'src/middleware/authMiddelware';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { CreateMovieDto } from 'src/dto/movie/create-movie.dto';
import { UpdateMovieDto } from 'src/dto/movie/update-movie.dto';
import {
  deleteRedisKey,
  deleteRedisKeyAll,
  getRedis,
  setRedis,
} from 'src/redisConfig';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('/movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(
    @InjectRepository(MovieModel) private model: Repository<MovieModel>,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new movie',
    description:
      'Endpoint used to create a new movie entry. Requires a valid Bearer token in the "Authorization" header to authenticate the request.',
  })
  public async create(
    @Body() body: CreateMovieDto,
  ): Promise<{ data: MovieModel }> {
    const movieCreated = await this.model.save(body);
    await setRedis(`movie-${movieCreated.id}`, JSON.stringify(movieCreated));
    const redisKeysToDelete = [
      'all-movies',
      `movies-${movieCreated.nationality}`,
      `movies-${movieCreated.director}`,
      `movies-${movieCreated.year}`,
      `movies-${movieCreated.title}`,
    ];
    await deleteRedisKeyAll(redisKeysToDelete);

    return { data: movieCreated };
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all movies',
    description:
      'Endpoint used to retrieve a list of all available movies. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  public async getAll(): Promise<{ data: MovieModel[] }> {
    const allMovies = await getRedis(`all-movies`);
    if (!!allMovies) {
      const allMoviesFound = JSON.parse(allMovies);
      return { data: allMoviesFound };
    } else {
      const movieList = await this.model.find();
      await setRedis(`all-movies`, JSON.stringify(movieList));
      return { data: movieList };
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific movie by Id',
    description:
      'Endpoint used to retrieve details of a specific movie by providing its unique identifier. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  public async getOne(@Param('id') id: number): Promise<{ data: MovieModel }> {
    const movieRedis = await getRedis(`movie-${id}`);
    if (!!movieRedis) {
      const movieRedisFound = JSON.parse(movieRedis);
      return { data: movieRedisFound };
    } else {
      const movie = await this.model.findOne({ where: { id } });
      if (!movie) {
        throw new NotFoundException(`No movie with this id was found!`);
      }
      await setRedis(`movie-${movie.id}`, JSON.stringify(movie));
      return { data: movie };
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a movie',
    description:
      'Endpoint used to update details of a specific movie by providing its unique identifier. Requires a valid Bearer token in the "Authorization" header to authenticate the request.',
  })
  public async update(
    @Param('id') id: number,
    @Body() body: UpdateMovieDto,
  ): Promise<{ data: MovieModel }> {
    const movieRedis = await getRedis(`movie-${id}`);
    if (movieRedis) {
      await deleteRedisKey(`movie-${id}`);
    }
    const redisKeysToDelete = [
      'all-movies',
      `movies-${body.nationality}`,
      `movies-${body.director}`,
      `movies-${body.year}`,
      `movies-${body.title}`,
    ];
    await deleteRedisKeyAll(redisKeysToDelete);

    const movie = await this.model.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`No movie with this id was found.`);
    }

    await this.model.update(id, body);

    return { data: await this.model.findOne({ where: { id } }) };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a movie',
    description:
      'Endpoint used to delete a specific movie by providing its unique identifier. Requires a valid Bearer token in the "Authorization" header to authenticate the request.',
  })
  public async delete(@Param('id') id: number): Promise<{ data: string }> {
    await deleteRedisKey('all-movies');
    const movieRedis = await getRedis(`movie-${id}`);
    if (movieRedis) {
      await deleteRedisKey(`movie-${id}`);
    }
    const movie = await this.model.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`No movie with this id was found.`);
    }

    const redisKeysToDelete = [
      'all-movies',
      `movies-${movie.nationality}`,
      `movies-${movie.director}`,
      `movies-${movie.year}`,
      `movies-${movie.title}`,
    ];
    await deleteRedisKeyAll(redisKeysToDelete);
    await this.model.delete(id);
    return { data: `Movie id:${id} has been successfully deleted!` };
  }

  @Get('byName/:name')
  @ApiOperation({
    summary: 'Retrieve movies by name',
    description:
      'Endpoint used to retrieve movies by their name. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  @ApiParam({
    name: 'name',
    description: 'Name of the movie to search for',
    example: 'Inception',
  })
  public async getByTitle(
    @Param('name') name: string,
  ): Promise<{ data: MovieModel[] }> {
    const movieRedis = await getRedis(`movies-${name}`);
    if (!!movieRedis) {
      const movieRedisFound = JSON.parse(movieRedis);
      return { data: movieRedisFound };
    } else {
      const movies = await this.model.find({
        where: { title: ILike(`%${name}%`) },
      });
      if (movies.length === 0) {
        throw new NotFoundException(`No movies with this name were found!`);
      }
      await setRedis(`movie-${name}`, JSON.stringify(movies));
      return { data: movies };
    }
  }

  @Get('byYear/:year')
  @ApiOperation({
    summary: 'Retrieve movies by year',
    description:
      'Endpoint used to retrieve movies released in a specific year. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  @ApiParam({
    name: 'year',
    description: 'Year of the movies to search for',
    example: 2010,
  })
  public async getByYear(
    @Param('year') year: number,
  ): Promise<{ data: MovieModel[] }> {
    const movieRedis = await getRedis(`movies-${year}`);
    if (!!movieRedis) {
      const movieRedisFound = JSON.parse(movieRedis);
      return { data: movieRedisFound };
    } else {
      const movies = await this.model.find({ where: { year } });
      if (movies.length === 0) {
        throw new NotFoundException(`No movies from this year were found!`);
      }
      await setRedis(`movie-${year}`, JSON.stringify(movies));
      return { data: movies };
    }
  }

  @Get('byDirector/:director')
  @ApiOperation({
    summary: 'Retrieve movies by director',
    description:
      'Endpoint used to retrieve movies directed by a specific director. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  @ApiParam({
    name: 'director',
    description: 'Director of the movies to search for',
    example: 'Christopher Nolan',
  })
  public async getByDirector(
    @Param('director') director: string,
  ): Promise<{ data: MovieModel[] }> {
    const movieRedis = await getRedis(`movies-${director}`);
    if (!!movieRedis) {
      const movieRedisFound = JSON.parse(movieRedis);
      return { data: movieRedisFound };
    } else {
      const movies = await this.model.find({
        where: { director: ILike(`%${director}%`) },
      });
      if (movies.length === 0) {
        throw new NotFoundException(`No movies by this director were found!`);
      }
      await setRedis(`movie-${director}`, JSON.stringify(movies));
      return { data: movies };
    }
  }

  @Get('byNationality/:nationality')
  @ApiOperation({
    summary: 'Retrieve movies by nationality',
    description:
      'Endpoint used to retrieve movies from a specific nationality. A valid Bearer token in the "Authorization" header is required to access this endpoint.',
  })
  @ApiParam({
    name: 'nationality',
    description: 'Nationality of the movies to search for',
    example: 'USA',
  })
  public async getByNationality(
    @Param('nationality')
    nationality: string,
  ): Promise<{ data: MovieModel[] }> {
    const movieRedis = await getRedis(`movies-${nationality}`);
    if (!!movieRedis) {
      const movieRedisFound = JSON.parse(movieRedis);
      return { data: movieRedisFound };
    } else {
      const movies = await this.model.find({
        where: { nationality: ILike(`%${nationality}%`) },
      });
      if (movies.length === 0) {
        throw new NotFoundException(
          `No movies from this nationality were found!`,
        );
      }
      await setRedis(`movie-${nationality}`, JSON.stringify(movies));
      return { data: movies };
    }
  }
}
