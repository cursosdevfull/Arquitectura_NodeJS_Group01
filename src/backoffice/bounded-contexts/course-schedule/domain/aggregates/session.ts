import { AggregateRoot } from '@nestjs/cqrs';

import { SessionDeletedEvent } from '../events/session-deleted';
import { SessionUpdatedEvent } from '../events/session-update';
import { NumberVO } from '../value-objects/number.vo';
import { UuidVO } from '../value-objects/uuid.vo';

export type SessionEssential = {
  readonly sessionId: UuidVO;
  readonly scheduleId: UuidVO;
  readonly date: Date;
  readonly duration: NumberVO;
};

export type SessionUpdate = Partial<
  Omit<SessionEssential, 'sessionId' | 'scheduleId' | 'duration'> & {
    duration: number;
  }
>;

export type SessionProperties = Required<SessionEssential>;

export class Session extends AggregateRoot {
  private readonly sessionId: UuidVO;
  private readonly scheduleId: UuidVO;
  private date: Date;
  private duration: NumberVO;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(properties: SessionProperties) {
    super();
    Object.assign(this, properties);
    this.createdAt = new Date();
    this.active = true;
  }

  properties() {
    return {
      sessionId: this.sessionId,
      scheduleId: this.scheduleId,
      date: this.date,
      duration: this.duration,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(fields: SessionUpdate) {
    Object.assign(this, fields);
    const durationResult = NumberVO.create(fields.duration);
    if (durationResult.isOk()) {
      this.duration = durationResult.value;
    }
    this.updatedAt = new Date();

    this.apply(Object.assign(new SessionUpdatedEvent(), this.properties()));
  }

  delete() {
    this.active = false;
    this.deletedAt = new Date();

    this.apply(Object.assign(new SessionDeletedEvent(), this.properties()));
  }
}
