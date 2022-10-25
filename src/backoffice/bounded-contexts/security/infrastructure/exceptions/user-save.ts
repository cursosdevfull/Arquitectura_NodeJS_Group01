import {
    InfrastructureException,
    InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class UserSaveDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(UserSaveDatabaseException.getMessage(message));
    this.name = InfrastructureExceptionCode.USER_SAVE_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `UserSaveDatabaseException: ${message}`;
  }
}
