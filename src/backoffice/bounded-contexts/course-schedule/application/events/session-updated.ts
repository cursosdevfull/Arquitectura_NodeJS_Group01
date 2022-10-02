import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SessionUpdatedEvent } from '../../domain/events/session-update';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';
import { SessionInfrastructure } from '../../infrastructure/session.infrastructure';

@EventsHandler(SessionUpdatedEvent)
export class SessionUpdateddHandler
  implements IEventHandler<SessionUpdatedEvent>
{
  constructor(
    @Inject(ScheduleInfrastructure)
    private repository: ScheduleRepository,
    @Inject(SessionInfrastructure) private repositorySession: SessionRepository,
  ) {}

  async handle(event: SessionUpdatedEvent) {
    console.log('SessionUpdateddHandler', event);
    const sessionsResult = await this.repositorySession.listByScheduleId(
      event.scheduleId.value,
    );

    if (sessionsResult.isErr()) {
      throw new InternalServerErrorException(
        sessionsResult.error.message,
        sessionsResult.error.name,
      );
    }

    const sessions = sessionsResult.value;
    const totalHours = sessions.reduce(
      (total, session) => total + session.duration,
      0,
    );

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
