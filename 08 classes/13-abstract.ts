abstract class IException {
  abstract codeError: number;
  abstract getMessage(message?: string): string;

  getErrorMessage(message?: string): string {
    return this.getMessage(message);
  }
}

class ScheduleIdInvalidException extends IException {
  codeError = 403;
  getMessage(id: string): string {
    return `ID: ${id} is invalid. Code error: ${this.codeError}`;
  }
}

class ScheduleStartInvalidException extends IException {
  codeError = 409;
  getMessage(start: string): string {
    return `Start: ${start} is invalid. Start date must be greater than current date`;
  }
}

const exceptionInvalid = new ScheduleIdInvalidException();
console.log(
  exceptionInvalid.getMessage("2cbc83ec-44c7-4def-a267-0466fda0dd1f")
);

const exceptionInvalidStart = new ScheduleStartInvalidException();
console.log(exceptionInvalidStart.getMessage("2020-01-01"));
console.log(exceptionInvalidStart.getErrorMessage("2022-08-20"));
