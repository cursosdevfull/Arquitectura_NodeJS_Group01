import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/backoffice/interfaces/decorators/roles.decorator';
import { AuthGuard } from 'src/backoffice/interfaces/guards/auth.guard';

import { FormatInterceptor } from '../../../../interfaces/interceptors/format.interceptor';
import { CreateScheduleCommand } from '../../application/commands/create-schedule.command';
import { DeleteScheduleCommand } from '../../application/commands/delete-schedule.command';
import { UpdateScheduleCommand } from '../../application/commands/update-schedule.command';
import { ListScheduleQuery } from '../../application/queries/list-schedule.query';
import { CreateScheduleDTO } from './dtos/create-schedule.dto';
import { DeleteScheduleDTO } from './dtos/delete-schedule.dto';
import { ListScheduleDTO } from './dtos/list-schedule.dto';
import { UpdateScheduleIdDTO } from './dtos/update-schedule-id.dto';

@ApiTags('Schedule')
@Controller('schedule')
@UseGuards(AuthGuard)
@UseInterceptors(FormatInterceptor)
export class ScheduleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateScheduleDTO) {
    const { courseId, subject, status } = body;

    const command = new CreateScheduleCommand(courseId, subject, status);
    const response = await this.commandBus.execute(command);

    return response;
  }

  @Delete(':scheduleId')
  async delete(@Param() params: DeleteScheduleDTO) {
    const { scheduleId } = params;

    const command = new DeleteScheduleCommand(scheduleId);

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Put(':scheduleId')
  async update(@Param() params: UpdateScheduleIdDTO, @Body() body: any) {
    const { scheduleId } = params;
    const {
      subject,
      status,
      frequency,
      duration,
      startDate,
      phrase,
      timeStartAndEnd,
      zoomId,
    } = body;

    const command = new UpdateScheduleCommand(
      scheduleId,
      subject,
      status,
      frequency,
      duration,
      startDate,
      phrase,
      timeStartAndEnd,
      zoomId,
    );

    await this.commandBus.execute(command);

    return 'ok';
  }

  @Get(':courseId')
  @Roles('ADMIN')
  async listByCourse(
    @Param() params: ListScheduleDTO,
    @Res({ passthrough: true }) res: any,
  ) {
    const { courseId } = params;

    console.log('User', res.locals.user);

    const query = new ListScheduleQuery(courseId);

    return await this.queryBus.execute(query);
  }
}
