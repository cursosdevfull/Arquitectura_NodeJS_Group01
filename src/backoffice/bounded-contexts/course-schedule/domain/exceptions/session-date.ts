import { DomainException, DomainExceptionCode } from 'src/core/domain/exceptions/domain.exception';

export class SessionDateInvalidException extends DomainException {
  constructor() {
    super(SessionDateInvalidException.getMessage());
    this.name = DomainExceptionCode.SESSION_DATE_INVALID_EXCEPTION;
  }

  static getMessage() {
    return `Date cannot be less than today`;
  }
}
