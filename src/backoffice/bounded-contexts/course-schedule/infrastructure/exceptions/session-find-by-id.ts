import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class SessionFindByIdDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(SessionFindByIdDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.FIND_SESSION_BY_ID_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `SessionFindByIdDatabaseException: ${message}`;
  }
}

export class SessionNotFoundException extends InfrastructureException {
  constructor() {
    super(SessionNotFoundException.getMessage());
    this.name = InfrastructureExceptionCode.SESSION_NOT_FOUND_EXCEPTION;
  }

  static getMessage() {
    return `SessionNotFoundException: Not found session`;
  }
}
