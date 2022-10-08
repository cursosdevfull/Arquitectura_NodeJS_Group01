import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcing } from '../../../domain/entities/event-sourcing';
import { SessionCreatedEvent } from '../../../domain/events/session-created';

@EventsHandler(SessionCreatedEvent)
export class EventSourcingSessionCreateHandler
  implements IEventHandler<SessionCreatedEvent>
{
  constructor() {}

  async handle(event: SessionCreatedEvent) {
    console.log('EventSourcingSessionCreateHandler', event);
    const evtSourcing = new EventSourcing(
      event.sessionId.value,
      'Session',
      'Created',
      event,
    );
  }
}
