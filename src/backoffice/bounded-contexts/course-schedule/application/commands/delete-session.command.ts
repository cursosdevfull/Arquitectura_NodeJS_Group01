import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { SessionRepository } from '../../domain/repositories/session.repository';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { SessionInfrastructure } from '../../infrastructure/session.infrastructure';

export class DeleteSessionCommand implements ICommand {
  constructor(public readonly sessionId: string) {}
}

@CommandHandler(DeleteSessionCommand)
export class DeleteSessionCommandHandler
  implements ICommandHandler<DeleteSessionCommand, any>
{
  constructor(
    @Inject(SessionInfrastructure) private repository: SessionRepository,
  ) {}

  async execute(command: DeleteSessionCommand): Promise<any> {
    const sessionIdResult = UuidVO.create(command.sessionId);

    if (sessionIdResult.isErr()) {
      throw new BadRequestException(
        sessionIdResult.error.message,
        sessionIdResult.error.name,
      );
    }

    const sessionId = sessionIdResult.value;

    const findSessionResult = await this.repository.findById(sessionId.value);

    if (findSessionResult.isErr()) {
      throw new InternalServerErrorException(
        findSessionResult.error.message,
        findSessionResult.error.name,
      );
    }

    const session = findSessionResult.value;
    session.delete();
    session.commit();

    const saveResult = await this.repository.save(session);

    return null;
  }
}
