export enum DomainExceptionCode {
  DEFAULT = 'DEFAULT',
  SCHEDULE_ID_INVALID = 'SCHEDULE_ID_INVALID',
  COURSE_ID_INVALID = 'COURSE_ID_INVALID',
}

export abstract class DomainException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = DomainExceptionCode.DEFAULT;
  }
}
