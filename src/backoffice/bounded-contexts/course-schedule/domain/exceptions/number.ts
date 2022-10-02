import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exceptions/domain.exception';

export class NumberInvalidException extends DomainException {
  constructor() {
    super(NumberInvalidException.getMessage());
    this.name = DomainExceptionCode.NUMBER_INVALID;
  }

  static getMessage() {
    return 'It is not a number';
  }
}
