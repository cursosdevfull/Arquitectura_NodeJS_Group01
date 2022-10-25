import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestErrorResponse, InternalServerErrorResponse, NotFoundResponse } from 'src/core/responses-error';

import { CreateSessionCommand } from '../../application/commands/create-session.command';
import { DeleteSessionCommand } from '../../application/commands/delete-session.command';
import { UpdateSessionCommand } from '../../application/commands/update-session.command';
import { SessionListResult } from '../../application/dtos/session-list-result.dto';
import { SessionCreateResponse } from '../../application/dtos/session-response.dto';
import { ListSessionQuery } from '../../application/queries/list-session.query';
import { CreateSessionDTO } from './dtos/create-session.dto';
import { DeleteSessionDTO } from './dtos/delete-session.dto';
import { ListSessionDTO } from './dtos/list-session.dto';
import { UpdateSessionIdDTO } from './dtos/update-session-id.dto';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create new session',
    type: SessionCreateResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No sessions found',
    type: NotFoundResponse,
  })
  async create(@Body() body: CreateSessionDTO) {
    const { scheduleId, date, duration } = body;

    const command = new CreateSessionCommand(scheduleId, date, duration);
    const response = await this.commandBus.execute(command);

    return response;
  }

  @ApiResponse({
    status: 201,
    description: 'Delete session',
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No session found',
    type: NotFoundResponse,
  })
  @Delete(':sessionId')
  async delete(@Param() params: DeleteSessionDTO) {
    const { sessionId } = params;

    const command = new DeleteSessionCommand(sessionId);

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Put(':sessionId')
  @ApiResponse({
    status: 201,
    description: 'Update session',
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No session found',
    type: NotFoundResponse,
  })
  async update(@Param() params: UpdateSessionIdDTO, @Body() body: any) {
    const { sessionId } = params;
    const { date, duration } = body;

    const command = new UpdateSessionCommand(sessionId, date, duration);

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Get(':scheduleId')
  @ApiResponse({
    status: 200,
    description: 'List all sessions by schedule',
    type: SessionListResult,
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No sessions found',
    type: NotFoundResponse,
  })
  async listBySchedule(@Param() params: ListSessionDTO) {
    const { scheduleId } = params;

    const query = new ListSessionQuery(scheduleId);

    return await this.queryBus.execute(query);
  }
}
