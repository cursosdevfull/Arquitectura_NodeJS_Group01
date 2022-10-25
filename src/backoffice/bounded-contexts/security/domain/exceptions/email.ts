import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exceptions/domain.exception';

export class EmailInvalidException extends DomainException {
  constructor() {
    super(EmailInvalidException.getMessage());
    this.name = DomainExceptionCode.EMAIL_INVALID;
  }

  static getMessage() {
    return 'Email has to be a valid email address.';
  }
}
