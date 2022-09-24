import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exceptions/domain.exception';

export class ScheduleIdInvalidException extends DomainException {
  constructor() {
    super(ScheduleIdInvalidException.getMessage());
    this.name = DomainExceptionCode.SCHEDULE_ID_INVALID;
  }

  static getMessage() {
    return 'ScheduleId must be a valid UUID';
  }
}
