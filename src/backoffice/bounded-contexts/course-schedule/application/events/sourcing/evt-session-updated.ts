import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcing } from '../../../domain/entities/event-sourcing';
import { SessionUpdatedEvent } from '../../../domain/events/session-update';
import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';

@EventsHandler(SessionUpdatedEvent)
export class EventSourcingSessionUpdateHandler
  implements IEventHandler<SessionUpdatedEvent>
{
  constructor(
    @Inject(EventSourcingInfrastructure)
    private readonly repository: EventSourcingRepository,
  ) {}

  async handle(event: SessionUpdatedEvent) {
    console.log('EventSourcingSessionCreateHandler', event);

    const evtSourcing = new EventSourcing(
      event.sessionId.value,
      'Session',
      'Updated',
      {
        ...event,
        sessionId: event.sessionId.value,
        scheduleId: event.scheduleId.value,
        duration: event.duration.value,
      },
    );

    await this.repository.save(evtSourcing);
  }
}
