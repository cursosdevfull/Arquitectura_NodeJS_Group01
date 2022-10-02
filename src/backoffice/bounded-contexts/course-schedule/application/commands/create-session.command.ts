import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { SessionFactory } from '../../domain/aggregates/session.factory';
import { SessionRepository } from '../../domain/repositories/session.repository';
import { NumberVO } from '../../domain/value-objects/number.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { SessionInfrastructure } from '../../infrastructure/session.infrastructure';
import { SessionCreateResponse, SessionResponse } from '../dtos/session-response.dto';

export class CreateSessionCommand implements ICommand {
  constructor(
    public readonly scheduleId: string,
    public readonly date: Date,
    public readonly duration: number,
  ) {}
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler
  implements ICommandHandler<CreateSessionCommand, SessionCreateResponse>
{
  constructor(
    @Inject(SessionInfrastructure) private repository: SessionRepository,
    private readonly sessionFactory: SessionFactory,
  ) {}

  async execute(command: CreateSessionCommand): Promise<SessionCreateResponse> {
    const { scheduleId, date, duration } = command;

    const scheduleIdResult = UuidVO.create(scheduleId);
    if (scheduleIdResult.isErr()) {
      throw new BadRequestException(
        scheduleIdResult.error.message,
        scheduleIdResult.error.name,
      );
    }

    const durationIdResult = NumberVO.create(duration);
    if (durationIdResult.isErr()) {
      throw new BadRequestException(
        durationIdResult.error.message,
        durationIdResult.error.name,
      );
    }

    const sessionIdResult = UuidVO.create(uuidv4());

    if (sessionIdResult.isErr()) {
      throw new InternalServerErrorException(
        sessionIdResult.error.message,
        sessionIdResult.error.name,
      );
    }

    const sessionId = sessionIdResult.value;

    const sessionResult = this.sessionFactory.create(
      sessionId,
      scheduleIdResult.value,
      date,
      durationIdResult.value,
    );

    if (sessionResult.isErr()) {
      throw new BadRequestException(
        sessionResult.error.message,
        sessionResult.error.name,
      );
    }

    const sessionCreateResult = await this.repository.save(sessionResult.value);
    if (sessionCreateResult.isErr()) {
      throw new InternalServerErrorException(
        sessionCreateResult.error.message,
        sessionCreateResult.error.name,
      );
    }

    sessionResult.value.commit();

    return SessionResponse.fromDomainToResponse(sessionCreateResult.value);
  }
}
