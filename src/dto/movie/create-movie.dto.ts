import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
  })
  title: string;

  @ApiProperty({
    description: 'Year of release of the movie',
    example: 2010,
  })
  year: number;

  @ApiProperty({
    description: 'Brief synopsis of the movie',
    example:
      'A thief who steals corporate secrets through the use of dream-sharing technology.',
  })
  synopsis: string;

  @ApiProperty({
    description: 'Director of the movie',
    example: 'Christopher Nolan',
  })
  director: string;

  @ApiProperty({
    description: 'Nationality of the movie production',
    example: 'USA',
  })
  nationality: string;

  @ApiProperty({
    description: 'URL to the movie poster image',
    example: 'https://example.com/poster.jpg',
  })
  posterURL: string;

  @ApiProperty({
    description: 'Genres associated with the movie',
    example: ['Sci-Fi', 'Action', 'Thriller'],
    type: [String],
  })
  genres: string[];
}
