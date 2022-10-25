import { BadRequestException, Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../domain/repositories/user.repository';
import { UserInfrastructure } from '../../infrastructure/user.infrastructure';
import { CryptService } from '../services/crypt.service';
import { TokensServices } from '../services/tokens.service';

export class LoginQuery implements IQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(
    @Inject(UserInfrastructure) private readonly repository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly tokensService: TokensServices,
  ) {}

  async execute(query: LoginQuery) {
    const { email, password } = query;

    const userResult = await this.repository.findByEmail(email);

    if (userResult.isErr()) {
      throw new BadRequestException(
        userResult.error.message,
        userResult.error.name,
      );
    }

    const user = userResult.value;
    const isMatch = await this.cryptService.comparePassword(
      password,
      user.properties().password,
    );

    if (!isMatch) {
      return null;
    }

    return {
      accessToken: this.tokensService.generateAccessToken(user),
      refreshToken: user.properties().refreshToken,
    };
  }
}
