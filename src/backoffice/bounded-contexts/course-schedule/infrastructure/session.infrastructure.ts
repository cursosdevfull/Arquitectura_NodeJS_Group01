import { Inject } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import { AppService } from 'src/app.service';

import { SessionListResult } from '../application/dtos/session-list-result.dto';
import { Session } from '../domain/aggregates/session';
import { SessionFactory } from '../domain/aggregates/session.factory';
import { SessionRepository } from '../domain/repositories/session.repository';
import { NumberVO } from '../domain/value-objects/number.vo';
import { UuidVO } from '../domain/value-objects/uuid.vo';
import { SessionDTO } from './dtos/session.dto';
import { SessionEntity } from './entities/session.entity';
import { SessionCreateDatabaseException } from './exceptions/session-create';
import { SessionFindByIdDatabaseException, SessionNotFoundException } from './exceptions/session-find-by-id';
import { SessionListByCourseDatabaseException } from './exceptions/session-list-by-schedule';

export type SessionCreateResult = Result<
  Session,
  SessionCreateDatabaseException
>;

export type SessionFindByIdResult = Result<
  Session,
  SessionFindByIdDatabaseException | SessionNotFoundException
>;

export type SessionFindByScheduleIdResult = Result<
  SessionListResult[],
  SessionNotFoundException
>;

export class SessionInfrastructure implements SessionRepository {
  constructor(@Inject(SessionFactory) private sessionFactory: SessionFactory) {}

  async findById(sessionId: string): Promise<SessionFindByIdResult> {
    try {
      const sessionEntity = await AppService.manager
        .getRepository(SessionEntity)
        .findOne({ where: { sessionId, active: true } });

      if (!sessionEntity) {
        return err(new SessionNotFoundException());
      }

      //return ok(SessionDTO.fromDataToDomain(sessionEntity));
      return ok(this.reconstitute(sessionEntity));
    } catch (error) {
      return err(new SessionFindByIdDatabaseException(error.sqlMessage));
    }
  }
  async save(session: Session): Promise<SessionCreateResult> {
    try {
      console.log('session received', session);
      const sessionEntity = SessionDTO.fromDomainToData(session);

      const sessionSaved = await AppService.manager
        .getRepository(SessionEntity)
        .save(sessionEntity);

      //return ok(SessionDTO.fromDataToDomain(sessionSaved));
      return ok(this.reconstitute(sessionSaved));
    } catch (error) {
      return err(new SessionCreateDatabaseException(error.sqlMessage));
    }
  }

  async listByScheduleId(
    scheduleId: string,
  ): Promise<SessionFindByScheduleIdResult> {
    try {
      const sessionEntities = await AppService.manager
        .getRepository(SessionEntity)
        .find({ where: { scheduleId, active: true } });

      if (!sessionEntities) {
        return err(new SessionNotFoundException());
      }

      return ok(SessionDTO.fromDataToApplication(sessionEntities));
    } catch (error) {
      return err(new SessionListByCourseDatabaseException(error.sqlMessage));
    }
  }

  reconstitute(sessionEntity: SessionEntity): Session {
    const sessionId = UuidVO.create(sessionEntity.sessionId);
    const scheduleId = UuidVO.create(sessionEntity.scheduleId);
    const duration = NumberVO.create(sessionEntity.duration);
    const date = sessionEntity.date as unknown as Date;

    if (sessionId.isErr() || scheduleId.isErr() || duration.isErr()) {
      return null;
    }

    return this.sessionFactory.reconstitute({
      sessionId: sessionId.value,
      scheduleId: scheduleId.value,
      duration: duration.value,
      date,
    });
  }
}
