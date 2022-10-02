import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class SessionCreateDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(SessionCreateDatabaseException.getMessage(message));
    this.name = InfrastructureExceptionCode.SAVE_SESSION_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `SessionCreateDatabaseException: ${message}`;
  }
}
