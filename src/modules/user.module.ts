import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { UserController } from "src/controllers/user.controller";
import { UserModel } from "src/models/user.model";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController]
})
export class UserModule {}