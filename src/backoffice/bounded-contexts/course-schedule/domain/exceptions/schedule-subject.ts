import { DomainException, DomainExceptionCode } from 'src/core/domain/exceptions/domain.exception';

export class ScheduleSubjectEmptyException extends DomainException {
  constructor() {
    super(ScheduleSubjectEmptyException.getMessage());
    this.name = DomainExceptionCode.SCHEDULE_SUBJECT_EMPTY_EXCEPTION;
  }

  static getMessage() {
    return `Subject cannot empty`;
  }
}

export class ScheduleWordsEnoughException extends DomainException {
  constructor() {
    super(ScheduleWordsEnoughException.getMessage());
    this.name = DomainExceptionCode.SCHEDULE_WORDS_ENOUGH_EXCEPTION;
  }

  static getMessage() {
    return `Subject must have at least 5 words`;
  }
}
