import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }from 'typeorm'
import { UserModel } from "src/models/user.model";

@Controller('/user')
export class UserController {
  constructor(@InjectRepository(UserModel) private model: Repository<UserModel> ){}
  @Post()
  public create(): any {
    return { data: 'Create!'};
  }

  @Get(':id')
  public getOne(): any {
    return { data: 'getOne!'};
  }

  @Get()
  public async getAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find()
    return { data: list };
  }

  @Put(':id')
  public update(): any {
    return { data: 'Update!'};
  }

  @Delete(':id')
  public delete(): any {
    return { data: 'Delete!'};
  }
}