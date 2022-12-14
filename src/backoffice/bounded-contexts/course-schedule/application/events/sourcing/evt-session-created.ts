import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventSourcing } from '../../../domain/entities/event-sourcing';
import { SessionCreatedEvent } from '../../../domain/events/session-created';
import { EventSourcingRepository } from '../../../domain/repositories/event-sourcing.repository';
import { EventSourcingInfrastructure } from '../../../infrastructure/event-sourcing.infrastructure';
import { SQSEventPublisher } from '../../../infrastructure/publisher/sqs-event.publisher';
import { IntegrationEventPublisher, IntegrationEventSubject } from '../integration-events';

@EventsHandler(SessionCreatedEvent)
export class EventSourcingSessionCreateHandler
  implements IEventHandler<SessionCreatedEvent>
{
  constructor(
    @Inject(EventSourcingInfrastructure)
    private readonly repository: EventSourcingRepository,
    @Inject(SQSEventPublisher)
    private readonly publisherSqs: IntegrationEventPublisher,
  ) {}

  async handle(event: SessionCreatedEvent) {
    console.log('EventSourcingSessionCreateHandler', event);

    const evtSourcing = new EventSourcing(
      event.sessionId.value,
      'Session',
      'Created',
      {
        ...event,
        sessionId: event.sessionId.value,
        scheduleId: event.scheduleId.value,
        duration: event.duration.value,
      },
    );

    await this.repository.save(evtSourcing);

    await this.publisherSqs.publish({
      subject: IntegrationEventSubject.SESSION_CREATED,
      data: {
        ...event,
        date: event.date.toString(),
        sessionId: event.sessionId.value,
        scheduleId: event.scheduleId.value,
        duration: event.duration.value.toString(),
      },
    });
  }
}
