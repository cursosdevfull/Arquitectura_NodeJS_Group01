import {
    InfrastructureException,
    InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class ScheduleCreateDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(ScheduleCreateDatabaseException.getMessage(message));
    this.name = InfrastructureExceptionCode.SAVE_SCHEDULE_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `ScheduleCreateDatabaseException: ${message}`;
  }
}
