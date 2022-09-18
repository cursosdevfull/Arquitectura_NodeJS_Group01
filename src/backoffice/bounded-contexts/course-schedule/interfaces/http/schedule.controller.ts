import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateScheduleCommand } from '../../application/commands/create-schedule.command';
import { DeleteScheduleCommand } from '../../application/commands/delete-schedule.command';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() body: any) {
    const { courseId, subject, status } = body;

    const command = new CreateScheduleCommand(courseId, subject, status);
    this.commandBus.execute(command);

    return 'schedule created';
  }

  @Delete(':scheduleId')
  delete(@Param() params: any) {
    const { scheduleId } = params;

    const command = new DeleteScheduleCommand(scheduleId);

    this.commandBus.execute(command);

    return 'ok';
  }
}
