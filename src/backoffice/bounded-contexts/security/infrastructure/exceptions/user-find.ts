import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class UserFindDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(UserFindDatabaseException.getMessage(message));
    this.name = InfrastructureExceptionCode.USER_FIND_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `UserFindDatabaseException: ${message}`;
  }
}

export class UserNotFoundException extends InfrastructureException {
  constructor(message: string) {
    super(UserNotFoundException.getMessage(message));
    this.name = InfrastructureExceptionCode.USER_NOT_FOUND_EXCEPTION;
  }

  static getMessage(message: string) {
    return `User not found: ${message}`;
  }
}
