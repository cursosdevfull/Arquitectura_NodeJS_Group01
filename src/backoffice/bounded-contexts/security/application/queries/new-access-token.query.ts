import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../domain/repositories/user.repository';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { UserInfrastructure } from '../../infrastructure/user.infrastructure';
import { CryptService } from '../services/crypt.service';
import { TokensServices } from '../services/tokens.service';

export class NewAccessTokenQuery implements IQuery {
  constructor(public readonly refreshToken: string) {}
}

@QueryHandler(NewAccessTokenQuery)
export class NewAccessTokenQueryHandler
  implements IQueryHandler<NewAccessTokenQuery>
{
  constructor(
    @Inject(UserInfrastructure) private readonly repository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly tokensService: TokensServices,
  ) {}

  async execute(query: NewAccessTokenQuery) {
    const { refreshToken } = query;

    const userResult = await this.repository.findByRefreshToken(refreshToken);

    if (userResult.isErr()) {
      throw new BadRequestException(
        userResult.error.message,
        userResult.error.name,
      );
    }

    const user = userResult.value;
    const resultUuid = UuidVO.create(this.tokensService.generateRefreshToken());
    if (resultUuid.isErr()) {
      throw new InternalServerErrorException(
        resultUuid.error.message,
        resultUuid.error.name,
      );
    }

    user.update({ refreshToken: resultUuid.value });

    const userResultUpdate = await this.repository.save(user);

    if (userResultUpdate.isErr()) {
      throw new InternalServerErrorException(
        userResultUpdate.error.message,
        userResultUpdate.error.name,
      );
    }

    return {
      accessToken: this.tokensService.generateAccessToken(user),
      refreshToken: user.properties().refreshToken,
    };
  }
}
