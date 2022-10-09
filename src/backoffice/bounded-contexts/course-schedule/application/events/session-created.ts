import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SessionCreatedEvent } from '../../domain/events/session-created';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';

@EventsHandler(SessionCreatedEvent)
export class SessionCreateHandler
  implements IEventHandler<SessionCreatedEvent>
{
  constructor(
    @Inject(ScheduleInfrastructure)
    private repository: ScheduleRepository,
  ) {}

  async handle(event: SessionCreatedEvent) {
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
    const totalHours = schedule.properties().totalHours + event.duration.value;
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
