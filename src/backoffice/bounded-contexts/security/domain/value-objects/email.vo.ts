import { err, ok, Result } from 'neverthrow';

import { EmailInvalidException } from '../exceptions/email';
import { ValueObject } from './value-object';

interface EmailProps {
  value: string;
}

export type emailIdResult = Result<EmailVO, EmailInvalidException>;

export class EmailVO extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string): emailIdResult {
    if (!this.emailValidate(email)) {
      return err(new EmailInvalidException());
    }

    return ok(new EmailVO({ value: email }));
  }

  static emailValidate(email: string): boolean {
    const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return regexp.test(email);
  }

  get value() {
    return this.props.value;
  }
}
