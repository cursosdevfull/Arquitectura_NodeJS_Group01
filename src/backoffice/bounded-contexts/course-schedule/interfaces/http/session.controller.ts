import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateSessionCommand } from '../../application/commands/create-session.command';
import { DeleteSessionCommand } from '../../application/commands/delete-session.command';
import { UpdateSessionCommand } from '../../application/commands/update-session.command';
import { ListSessionQuery } from '../../application/queries/list-session.query';
import { CreateSessionDTO } from './dtos/create-session.dto';
import { DeleteSessionDTO } from './dtos/delete-session.dto';
import { ListSessionDTO } from './dtos/list-session.dto';
import { UpdateSessionIdDTO } from './dtos/update-session-id.dto';

@Controller('session')
export class SessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateSessionDTO) {
    const { scheduleId, date, duration } = body;

    const command = new CreateSessionCommand(scheduleId, date, duration);
    const response = await this.commandBus.execute(command);

    return response;
  }

  @Delete(':sessionId')
  async delete(@Param() params: DeleteSessionDTO) {
    const { sessionId } = params;

    const command = new DeleteSessionCommand(sessionId);

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Put(':sessionId')
  async update(@Param() params: UpdateSessionIdDTO, @Body() body: any) {
    const { sessionId } = params;
    const { date, duration } = body;

    const command = new UpdateSessionCommand(sessionId, date, duration);

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Get(':scheduleId')
  async listBySchedule(@Param() params: ListSessionDTO) {
    const { scheduleId } = params;

    const query = new ListSessionQuery(scheduleId);

    return await this.queryBus.execute(query);
  }
}
