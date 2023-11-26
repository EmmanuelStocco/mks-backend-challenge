import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar usuário',
    description: 'Endpoint utilizado para criar um novo usuário.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os usuários',
    description: 'Endpoint utilizado para buscar todos os usuários.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar por usuário único via id',
    description: 'Endpoint utilizado para buscar por apenas um usuário, através do id único de cada.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Endpoint utilizado para atualizar as informações de um usuário através do id.',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deletar usuário',
    description: 'Endpoint utilizado para deletar um usuário através do id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({
    summary: 'Realizar login',
    description: 'Endpoint logar um usuário através de JWT, recebendo as credenciais, validando e retornando um Token.',
  })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto.email, loginUserDto.password);
  }
}
