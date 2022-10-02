import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class SessionListByCourseDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(SessionListByCourseDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.LIST_SESSION_BY_SCHEDULE_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `SessionListByCourseDatabaseException: ${message}`;
  }
}
