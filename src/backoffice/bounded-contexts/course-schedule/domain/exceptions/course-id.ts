import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exceptions/domain.exception';

export class CourseIdInvalidException extends DomainException {
  constructor() {
    super(CourseIdInvalidException.getMessage());
    this.name = DomainExceptionCode.COURSE_ID_INVALID;
  }

  static getMessage() {
    return 'CourseId must be a valid UUID';
  }
}
