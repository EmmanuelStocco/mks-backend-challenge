import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/controllers/movie.controller';
import { AuthGuard } from 'src/middleware/authMiddelware';
import { MovieModel } from 'src/models/movie.model';
import { UserModel } from 'src/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel, UserModel])],
  controllers: [MovieController],
  providers: [AuthGuard],
})
export class MovieModule {}
