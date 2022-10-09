import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcing } from '../../../domain/entities/event-sourcing';
import { SessionDeletedEvent } from '../../../domain/events/session-deleted';
import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';

@EventsHandler(SessionDeletedEvent)
export class EventSourcingSessionDeleteHandler
  implements IEventHandler<SessionDeletedEvent>
{
  constructor(
    @Inject(EventSourcingInfrastructure)
    private readonly repository: EventSourcingRepository,
  ) {}

  async handle(event: SessionDeletedEvent) {
    console.log('EventSourcingSessionCreateHandler', event);

    const evtSourcing = new EventSourcing(
      event.sessionId.value,
      'Session',
      'Deleted',
      {},
    );

    await this.repository.save(evtSourcing);
  }
}
