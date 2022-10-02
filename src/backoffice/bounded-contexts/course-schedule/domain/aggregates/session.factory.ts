import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { err, ok, Result } from 'neverthrow';

import { SessionCreatedEvent } from '../events/session-created';
import { SessionDateInvalidException } from '../exceptions/session-date';
import { NumberVO } from '../value-objects/number.vo';
import { UuidVO } from '../value-objects/uuid.vo';
import { Session, SessionProperties } from './session';

export type SessionFactoryResult = Result<Session, SessionDateInvalidException>;

export class SessionFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(
    sessionId: UuidVO,
    scheduleId: UuidVO,
    date: Date,
    duration: NumberVO,
  ): SessionFactoryResult {
    if (date > new Date()) return err(new SessionDateInvalidException());

    const properties: SessionProperties = {
      sessionId,
      scheduleId,
      date,
      duration,
    };

    const session = new Session(properties);

    this.eventPublisher.mergeObjectContext(session);

    /*     const event = new SessionCreatedEvent();
    event.date = session.properties().date;
    event.duration = session.properties().duration;
    event.scheduleId = session.properties().scheduleId;
    event.sessionId = session.properties().sessionId; */

    session.apply(
      Object.assign(new SessionCreatedEvent(), session.properties()),
    );

    return ok(session);
  }

  reconstitute(properties: SessionProperties): Session {
    const session = new Session(properties);
    this.eventPublisher.mergeObjectContext(session);
    return session;
  }
}
