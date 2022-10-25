import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../application/commands/create-user.command';
import { LoginQuery } from '../../application/queries/login-user.query';
import { NewAccessTokenQuery } from '../../application/queries/new-access-token.query';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { NewAccessTokenDto } from './dtos/new-access-token';

@Controller('auth')
export class SecurityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const { name, email, password, roles } = body;
    const uniqueRoles = [...new Set(roles)];

    const command = new CreateUserCommand(name, email, password, uniqueRoles);

    const result = await this.commandBus.execute(command);

    return result;
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    const { email, password } = body;

    const query = new LoginQuery(email, password);

    const result = await this.queryBus.execute(query);

    return result;
  }

  @Get('/new-access-token/:refreshToken')
  async getNewAccessToken(@Param() param: NewAccessTokenDto) {
    const { refreshToken } = param;

    const query = new NewAccessTokenQuery(refreshToken);

    const result = await this.queryBus.execute(query);

    return result;
  }
}
