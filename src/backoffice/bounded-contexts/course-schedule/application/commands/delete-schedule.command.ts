import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';

export class DeleteScheduleCommand implements ICommand {
  constructor(public readonly scheduleId: string) {}
}

@CommandHandler(DeleteScheduleCommand)
export class DeleteScheduleCommandHandler
  implements ICommandHandler<DeleteScheduleCommand, any>
{
  constructor(
    @Inject(ScheduleInfrastructure) private repository: ScheduleRepository,
  ) {}

  async execute(command: DeleteScheduleCommand): Promise<any> {
    const scheduleIdResult = ScheduleVO.create(command.scheduleId);

    if (scheduleIdResult.isErr()) {
      throw new BadRequestException(
        scheduleIdResult.error.message,
        scheduleIdResult.error.name,
      );
    }

    const scheduleId = scheduleIdResult.value;

    const findScheduleResult = await this.repository.findById(scheduleId.value);

    if (findScheduleResult.isErr()) {
      throw new InternalServerErrorException(
        findScheduleResult.error.message,
        findScheduleResult.error.name,
      );
    }

    const schedule = findScheduleResult.value;
    schedule.delete();

    const saveResult = await this.repository.save(schedule);

    return null;
  }
}
