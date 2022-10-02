import { SessionListResult } from '../../application/dtos/session-list-result.dto';
import { Session, SessionProperties } from '../../domain/aggregates/session';
import { NumberVO } from '../../domain/value-objects/number.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { SessionEntity } from '../entities/session.entity';

export class SessionDTO {
  static fromDomainToData(session: Session): SessionEntity {
    console.log('session dto', session);
    console.log('properties', session.properties());
    const sessionEntity = new SessionEntity();
    sessionEntity.sessionId = session.properties().sessionId.value;
    sessionEntity.scheduleId = session.properties().scheduleId.value;
    sessionEntity.date = session.properties().date?.toISOString();
    sessionEntity.duration = session.properties().duration.value;
    sessionEntity.active = session.properties().active;
    sessionEntity.createdAt = session.properties().createdAt;
    sessionEntity.updatedAt = session.properties().updatedAt;
    sessionEntity.deletedAt = session.properties().deletedAt;

    console.log('sessionEntity', sessionEntity);

    return sessionEntity;
  }

  static fromDataToDomain(sessionEntity: SessionEntity): Session {
    const sessionIdresult = UuidVO.create(sessionEntity.sessionId);
    const scheduleIdresult = UuidVO.create(sessionEntity.scheduleId);
    const durationResult = NumberVO.create(sessionEntity.duration);

    if (
      sessionIdresult.isOk() &&
      scheduleIdresult.isOk() &&
      durationResult.isOk()
    ) {
      const sessionProperties: SessionProperties = {
        sessionId: sessionIdresult.value,
        scheduleId: scheduleIdresult.value,
        date: new Date(sessionEntity.date),
        duration: durationResult.value,
      };
      return new Session(sessionProperties);
    } else {
      return null;
    }
  }

  static fromDataToApplication(
    sessionEntities: SessionEntity[],
  ): SessionListResult[] {
    return sessionEntities.map((sessionEntity) => ({
      sessionId: sessionEntity.sessionId,
      scheduleId: sessionEntity.scheduleId,
      date: new Date(sessionEntity.date),
      duration: sessionEntity.duration,
    }));
  }
}
