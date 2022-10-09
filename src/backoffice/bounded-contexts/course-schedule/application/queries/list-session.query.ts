import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Session, SessionEssential } from '../../domain/aggregates/session';
import { EventSourcingRepository } from '../../domain/repositories/event-sourcing.repository';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { EventSourcingInfrastructure } from '../../infrastructure/event-sourcing.infrastructure';
import { SessionInfrastructure } from '../../infrastructure/session.infrastructure';
import { SessionListResult } from '../dtos/session-list-result.dto';

export class ListSessionQuery implements IQuery {
  constructor(public readonly scheduleId: string) {}
}

@QueryHandler(ListSessionQuery)
export class ListSessionQueryHandler
  implements IQueryHandler<ListSessionQuery, SessionListResult[]>
{
  constructor(
    @Inject(SessionInfrastructure) private repository: SessionRepository,
    @Inject(EventSourcingInfrastructure)
    private repositoryEventSourcing: EventSourcingRepository,
  ) {}

  async execute(query: ListSessionQuery): Promise<SessionListResult[]> {
    const scheduleIdResult = UuidVO.create(query.scheduleId);

    if (scheduleIdResult.isErr()) {
      throw new BadRequestException(
        scheduleIdResult.error.message,
        scheduleIdResult.error.name,
      );
    }

    const scheduleId = scheduleIdResult.value;

    const sessionsResult = await this.repository.listByScheduleId(
      scheduleId.value,
    );

    if (sessionsResult.isErr()) {
      throw new InternalServerErrorException(
        sessionsResult.error.message,
        sessionsResult.error.name,
      );
    }

    const records = await this.repositoryEventSourcing.list();
    let objRecord;

    for (const record of records) {
      if (record.action === 'Created') {
        const properties: SessionEssential = {
          sessionId: record.recordId,
          scheduleId: record.data.scheduleId,
          date: record.data.date,
          duration: record.data.duration,
        };
        objRecord = new Session(properties);
      } else if (record.action === 'Updated') {
        const result = await this.repository.findById(record.recordId);
        if (result.isErr()) {
          throw new InternalServerErrorException(
            result.error.message,
            result.error.name,
          );
        }

        objRecord = result.value;
        objRecord.update(record.data);
      } else if (record.action === 'Deleted') {
        const result = await this.repository.findById(record.recordId);
        if (result.isErr()) {
          throw new InternalServerErrorException(
            result.error.message,
            result.error.name,
          );
        }

        objRecord = result.value;
        objRecord.delete();
      }
    }

    console.log('Reconstituted object', objRecord);

    return sessionsResult.value;
  }
}
