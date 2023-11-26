import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { getRedis, setRedis } from 'src/redisConfig';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Endpoint used to create a new user.',
  })
  public async create(
    @Body() body: CreateUserDto,
  ): Promise<{ data: UserModel }> {
    const { email, password, confirmPassword, name } = body;
    const userExistsByEmail = await this.model.findOne({ where: { email } });
    if (userExistsByEmail) {
      throw new BadRequestException('Already registered user');
    }

    if (password != confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      password: hashPassword,
      email,
    };

    const userCreated = await this.model.save(newUser);
    return { data: userCreated };
  }

  @Post('login')
  @ApiOperation({
    summary: 'Perform login',
    description:
      'Endpoint to log in a user via JWT, receiving credentials, validating, and returning a Token.',
  })
  async login(
    @Body()
    { email, password }: LoginUserDto,
  ): Promise<{ user: Omit<UserModel, 'password'>; token: string }> {
    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }
    const user = await this.model.findOne({ where: { email: email } });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
      expiresIn: '8h',
    });

    const { password: _, ...userLogin } = user;

    await setRedis(`user-${user.id}`, JSON.stringify(user));
    return {
      user: userLogin,
      token: token,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve single user by ID',
    description: 'Endpoint used to retrieve a single user by their unique ID.',
  })
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: UserModel }> {
    const userRedis = await getRedis(`user-${id}`);

    if (!!userRedis) {
      const userRedisFound = JSON.parse(userRedis);
      return { data: userRedisFound };
    } else {
      const user = await this.model.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`No users with this id were found!`);
      }
      return { data: user };
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all users',
    description: 'Endpoint used to retrieve all users.',
  })
  public async getAll(): Promise<{ data: UserModel[] }> {
    const list = await this.model.find();
    return { data: list };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description: "Endpoint used to update a user's information by their ID.",
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<{ data: UserModel }> {
    const user = await this.model.findOne({ where: { id } });
    const { email, password, confirmPassword, name } = body;

    if (password != confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (!user) {
      throw new NotFoundException(`No users with this id were found.`);
    }
    const updateUser = {
      name,
      password: hashPassword,
      email,
    };

    await this.model.update({ id }, updateUser);

    return { data: await this.model.findOne({ where: { id } }) };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Endpoint used to delete a user by their ID.',
  })
  public async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: string }> {
    const user = await this.model.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No users with this id were found.`);
    }
    await this.model.delete(id);
    return { data: `User id:${id} has been successfully deleted!` };
  }
}
