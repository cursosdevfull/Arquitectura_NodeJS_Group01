export enum DomainExceptionCode {
  DEFAULT = 'DEFAULT',
  SCHEDULE_ID_INVALID = 'SCHEDULE_ID_INVALID',
  COURSE_ID_INVALID = 'COURSE_ID_INVALID',
  STATUS_EMPTY = 'STATUS_EMPTY',
  SCHEDULE_SUBJECT_EMPTY_EXCEPTION = 'SCHEDULE_SUBJECT_EMPTY_EXCEPTION',
  SCHEDULE_WORDS_ENOUGH_EXCEPTION = 'SCHEDULE_WORDS_ENOUGH_EXCEPTION',
}

export abstract class DomainException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = DomainExceptionCode.DEFAULT;
  }
}
