import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SessionDeletedEvent } from '../../domain/events/session-deleted';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';

@EventsHandler(SessionDeletedEvent)
export class SessionDeletedHandler
  implements IEventHandler<SessionDeletedEvent>
{
  constructor(
    @Inject(ScheduleInfrastructure)
    private repository: ScheduleRepository,
  ) {}

  async handle(event: SessionDeletedEvent) {
    console.log('SessionDeletedEvent', event);
    const scheduleResult = await this.repository.findById(
      event.scheduleId.value,
    );

    if (scheduleResult.isErr()) {
      throw new InternalServerErrorException(
        scheduleResult.error.message,
        scheduleResult.error.name,
      );
    }

    const schedule = scheduleResult.value;
    const totalHours = schedule.properties().totalHours - event.duration.value;

    schedule.update({ totalHours });

    const updateResult = await this.repository.save(schedule);
    if (updateResult.isErr()) {
      throw new InternalServerErrorException(
        updateResult.error.message,
        updateResult.error.name,
      );
    }
  }
}
