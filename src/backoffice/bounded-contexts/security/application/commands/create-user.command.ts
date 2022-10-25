import { BadGatewayException, BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { UserFactory } from '../../domain/aggregates/user-factory';
import { UserRepository } from '../../domain/repositories/user.repository';
import { emailIdResult, EmailVO } from '../../domain/value-objects/email.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { UserInfrastructure } from '../../infrastructure/user.infrastructure';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CryptService } from '../services/crypt.service';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly roles: any[],
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, any>
{
  constructor(
    @Inject(UserInfrastructure) private repository: UserRepository,
    private factory: UserFactory,
    private readonly cryptService: CryptService,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { name, email, password, roles } = command;

    const hashedPassword = await this.cryptService.hashPassword(password);

    const userIdResult = UuidVO.create(uuidv4());
    const emailIdResult = EmailVO.create(email);
    const refreshTokenResult = UuidVO.create(uuidv4());

    if (userIdResult.isErr()) {
      throw new InternalServerErrorException(
        userIdResult.error.message,
        userIdResult.error.name,
      );
    }

    if (emailIdResult.isErr()) {
      throw new BadGatewayException(
        emailIdResult.error.message,
        emailIdResult.error.name,
      );
    }

    if (refreshTokenResult.isErr()) {
      throw new InternalServerErrorException(
        refreshTokenResult.error.message,
        refreshTokenResult.error.name,
      );
    }

    const userResult = this.factory.create(
      userIdResult.value,
      name,
      emailIdResult.value,
      hashedPassword,
      refreshTokenResult.value,
      roles,
    );

    if (userResult.isErr()) {
      throw new BadRequestException(
        userResult.error.message,
        userResult.error.name,
      );
    }

    const userSaveResult = await this.repository.save(userResult.value);

    if (userSaveResult.isErr()) {
      throw new InternalServerErrorException(
        userSaveResult.error.message,
        userSaveResult.error.name,
      );
    }

    return UserResponseDto.fromApplicationToResponse(userSaveResult.value);
  }
}
