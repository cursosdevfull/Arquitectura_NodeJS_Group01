import { DomainException, DomainExceptionCode } from 'src/core/domain/exceptions/domain.exception';

export class NameEmptyException extends DomainException {
  constructor() {
    super(NameEmptyException.getMessage());
    this.name = DomainExceptionCode.NAME_EMPTY;
  }

  static getMessage() {
    return `Name cannot empty`;
  }
}

export class PasswordEmptyException extends DomainException {
  constructor() {
    super(PasswordEmptyException.getMessage());
    this.name = DomainExceptionCode.PASSWORD_EMPTY;
  }

  static getMessage() {
    return `Password cannot empty`;
  }
}

export class RolesEmptyException extends DomainException {
  constructor() {
    super(RolesEmptyException.getMessage());
    this.name = DomainExceptionCode.ROLES_EMPTY;
  }

  static getMessage() {
    return `Password cannot empty`;
  }
}
