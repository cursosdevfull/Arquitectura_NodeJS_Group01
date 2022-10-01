import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';

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
  implements ICommandHandler<UpdateScheduleCommand, void>
{
  constructor(
    @Inject(ScheduleInfrastructure) private repository: ScheduleRepository,
  ) {}

  async execute(command: UpdateScheduleCommand): Promise<void> {
    const scheduleIdResult = ScheduleVO.create(command.scheduleId);

    if (scheduleIdResult.isErr()) {
      throw new BadRequestException(
        scheduleIdResult.error.message,
        scheduleIdResult.error.name,
      );
    }

    const scheduleResult = await this.repository.findById(
      scheduleIdResult.value.value,
    );

    if (scheduleResult.isErr()) {
      throw new InternalServerErrorException(
        scheduleResult.error.message,
        scheduleResult.error.name,
      );
    }

    const schedule = scheduleResult.value;

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
    await this.repository.save(schedule);
    return null;
  }
}
