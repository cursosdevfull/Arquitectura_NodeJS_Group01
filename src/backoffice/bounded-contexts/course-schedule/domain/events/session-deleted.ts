import { IEvent } from '@nestjs/cqrs';

import { SessionProperties } from '../aggregates/session';
import { NumberVO } from '../value-objects/number.vo';
import { UuidVO } from '../value-objects/uuid.vo';

export class SessionDeletedEvent implements IEvent, SessionProperties {
  sessionId: UuidVO;
  scheduleId: UuidVO;
  date: Date;
  duration: NumberVO;
}
