import { DomainException, DomainExceptionCode } from 'src/core/domain/exceptions/domain.exception';

export class StatusEmptyException extends DomainException {
  constructor() {
    super(StatusEmptyException.getMessage());
    this.name = DomainExceptionCode.STATUS_EMPTY;
  }

  static getMessage() {
    return `Status cannot empty`;
  }
}
