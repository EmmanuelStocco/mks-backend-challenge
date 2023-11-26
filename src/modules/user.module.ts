import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { AuthGuard } from 'src/middleware/authMiddelware';
import { UserModel } from 'src/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [AuthGuard],
})
export class UserModule {}
