import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class ScheduleListByCourseDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(ScheduleListByCourseDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.LIST_SCHEDULE_BY_COURSE_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `ScheduleListByCourseDatabaseException: ${message}`;
  }
}
