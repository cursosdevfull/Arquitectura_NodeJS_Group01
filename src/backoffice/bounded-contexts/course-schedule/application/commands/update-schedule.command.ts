import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Schedule } from '../../domain/aggregates/schedule';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';

export class UpdateScheduleCommand implements ICommand {
  constructor(
    public readonly scheduleId: string,
    public readonly subject: string,
    public readonly status: string,
    public readonly frequency: string,
    public readonly duration: string,
    public readonly startDate: Date,
    public readonly phrase: string,
    public readonly timeStartAndEnd: string,
    public readonly zoomId: string,
  ) {}
}

@CommandHandler(UpdateScheduleCommand)
export class UpdateScheduleCommandHandler
  implements ICommandHandler<UpdateScheduleCommand, any>
{
  private findScheduleById(scheduleId: string): Schedule {
    const scheduleIdResult = ScheduleVO.create(scheduleId);

    if (scheduleIdResult.isErr()) {
      throw new BadRequestException(scheduleIdResult.error.message);
    }

    const scheduleIdVO = scheduleIdResult.value;

    return new Schedule({
      scheduleId: scheduleIdVO,
      courseId: '723915cb-324e-4d6c-8a46-6e660c79a1e6',
      subject: 'Curso Docker y Kubernetes desde cero',
      status: 'READY',
    });
  }

  execute(command: UpdateScheduleCommand): Promise<any> {
    const schedule = this.findScheduleById(command.scheduleId);
    schedule.update({
      subject: command.subject,
      status: command.status,
      frequency: command.frequency,
      duration: command.duration,
      startDate: new Date(command.startDate),
      phrase: command.phrase,
      timeStartAndEnd: command.timeStartAndEnd,
      zoomId: command.zoomId,
    });
    console.log(schedule.properties());
    return Promise.resolve();
  }
}
