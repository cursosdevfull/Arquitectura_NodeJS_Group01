import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { SessionRepository } from '../../domain/repositories/session.repository';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { SessionInfrastructure } from '../../infrastructure/session.infrastructure';

export class UpdateSessionCommand implements ICommand {
  constructor(
    public readonly sessionId: string,
    public readonly date: Date,
    public readonly duration: number,
  ) {}
}

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionCommandHandler
  implements ICommandHandler<UpdateSessionCommand, void>
{
  constructor(
    @Inject(SessionInfrastructure) private repository: SessionRepository,
  ) {}

  async execute(command: UpdateSessionCommand): Promise<void> {
    const sessionIdResult = UuidVO.create(command.sessionId);

    if (sessionIdResult.isErr()) {
      throw new BadRequestException(
        sessionIdResult.error.message,
        sessionIdResult.error.name,
      );
    }

    const sessionResult = await this.repository.findById(
      sessionIdResult.value.value,
    );

    if (sessionResult.isErr()) {
      throw new InternalServerErrorException(
        sessionResult.error.message,
        sessionResult.error.name,
      );
    }

    const session = sessionResult.value;

    session.update({
      date: command.date,
      duration: command.duration,
    });

    await this.repository.save(session);

    session.commit();

    return null;
  }
}
