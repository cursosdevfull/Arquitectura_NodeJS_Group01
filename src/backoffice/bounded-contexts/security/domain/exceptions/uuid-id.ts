import { DomainException, DomainExceptionCode } from '../../../../../core/domain/exceptions/domain.exception';

export class UuidIdInvalidException extends DomainException {
  constructor() {
    super(UuidIdInvalidException.getMessage());
    this.name = DomainExceptionCode.UUID_ID_INVALID;
  }

  static getMessage() {
    return 'UuidId must be a valid UUID';
  }
}
