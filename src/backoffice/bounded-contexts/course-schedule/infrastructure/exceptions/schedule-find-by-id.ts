import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class ScheduleFindByIdDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(ScheduleFindByIdDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.FIND_SCHEDULE_BY_ID_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `ScheduleFindByIdDatabaseException: ${message}`;
  }
}

export class ScheduleNotFoundException extends InfrastructureException {
  constructor() {
    super(ScheduleNotFoundException.getMessage());
    this.name = InfrastructureExceptionCode.SCHEDULE_NOT_FOUND_EXCEPTION;
  }

  static getMessage() {
    return `ScheduleNotFoundException: Not found schedule`;
  }
}
