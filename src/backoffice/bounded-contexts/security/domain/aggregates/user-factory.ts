import { err, ok, Result } from 'neverthrow';

import { NameEmptyException, PasswordEmptyException, RolesEmptyException } from '../exceptions/user';
import { EmailVO } from '../value-objects/email.vo';
import { UuidVO } from '../value-objects/uuid.vo';
import { User } from './user';

export type UserResult = Result<
  User,
  NameEmptyException | PasswordEmptyException | RolesEmptyException
>;

export class UserFactory {
  create(
    userId: UuidVO,
    name: string,
    email: EmailVO,
    password: string,
    refreshToken: UuidVO,
    roles: string[],
  ): UserResult {
    if (!name || name.trim() === '') {
      return err(new NameEmptyException());
    }

    if (!password || password.trim() === '') {
      return err(new PasswordEmptyException());
    }

    if (!roles || roles.length === 0) {
      return err(new RolesEmptyException());
    }

    return ok(
      new User({
        userId,
        name,
        email,
        password,
        refreshToken,
        roles,
      }),
    );
  }
}
