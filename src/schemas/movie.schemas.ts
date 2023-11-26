import { IsArray, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieSchema {
  @ApiProperty({
    description: 'O título do filme',
    example: 'Nome do Filme',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'O ano de lançamento do filme',
    example: 2023,
  })
  @IsOptional()
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'A sinopse do filme',
    example: 'Sinopse do filme...',
  })
  @IsOptional()
  @IsString()
  synopsis: string;

  @ApiProperty({
    description: 'O diretor do filme',
    example: 'Nome do Diretor',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  director: string;

  @ApiProperty({
    description: 'A nacionalidade do filme',
    example: 'País de Origem',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality: string;

  @ApiProperty({
    description: 'A URL do pôster do filme',
    example: 'https://example.com/poster.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  posterURL: string;

  @ApiProperty({
    description: 'Os gêneros do filme',
    example: ['Ação', 'Drama'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
