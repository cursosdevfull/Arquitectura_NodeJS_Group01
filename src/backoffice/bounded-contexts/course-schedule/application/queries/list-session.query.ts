import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SessionRepository } from '../../domain/repositories/session.repository';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
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

    return sessionsResult.value;
  }
}
