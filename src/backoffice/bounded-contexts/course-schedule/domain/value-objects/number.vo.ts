import { err, ok, Result } from 'neverthrow';

import { NumberInvalidException } from '../exceptions/number';
import { ValueObject } from './value-object';

interface NumberProps {
  value: number;
}

export type numberResult = Result<NumberVO, NumberInvalidException>;

export class NumberVO extends ValueObject<NumberProps> {
  private constructor(props: NumberProps) {
    super(props);
  }

  static create(num: number): numberResult {
    if (isNaN(num)) {
      return err(new NumberInvalidException());
    }

    return ok(new NumberVO({ value: num }));
  }

  get value() {
    return this.props.value;
  }
}
