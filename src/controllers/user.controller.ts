import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }from 'typeorm'
import { UserModel } from "src/models/user.model";
import { UserSchema } from "src/schemas/user.schemas"; 
import * as bcrypt from 'bcrypt';


@Controller('/user')
export class UserController {
  constructor(@InjectRepository(UserModel) private model: Repository<UserModel> ){}
  @Post()
  public async create(@Body() body: UserSchema
  ): Promise<{ data: UserModel }> {
    const { email, password, confirmPassword, name } = body;
    const userExistsByEmail = await this.model.findOne({ where: { email } });
    if (userExistsByEmail) {
      throw new BadRequestException('Already registered user');
    }

    if (password != confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = {
      name,
      password: hashPassword,
      email,
    };

    const userCreated = await this.model.save(newUser);
    return { data: userCreated };
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number
  ): Promise<{ data: UserModel }>  {
    const user = await this.model.findOne({ where: { id }});
    if(!user) {
      throw new NotFoundException(`No users with this id were found!`)
    }
    return { data: user };
  }

  @Get()
  public async getAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find()
    return { data: list };
  }

  @Put(':id')
  public async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: UserSchema
    ): Promise<{ data: UserModel }> {
    const user = await this.model.findOne({ where: { id }});
    
    if(!user) {
      throw new NotFoundException(`No users with this id were found.`)
    }
    await this.model.update({ id }, body)

    return { data: await this.model.findOne({ where: { id }}) };
  }

  @Delete(':id')
  public async delete(
    @Param('id', ParseIntPipe) id: number
    ): Promise<{ data: string }> {
      const user = await this.model.findOne({ where: { id }});
      if(!user) {
        throw new NotFoundException(`No users with this id were found.`)
      }
      await this.model.delete(id);
      return { data: `User id:${id} has been successfully deleted!` };
  }
}