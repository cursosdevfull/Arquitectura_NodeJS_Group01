import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokensServices } from '../../bounded-contexts/security/application/services/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly tokensService: TokensServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const response = context.switchToHttp().getResponse();

    try {
      const payload = await this.tokensService.validateAccessToken(
        response.locals.accessToken,
      );

      const rolesUser = payload.roles;
      return rolesUser.some((role) => roles.includes(role));
    } catch (error) {
      if (error.code === 403) {
        throw new ForbiddenException('Token expired');
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }
  }
}
