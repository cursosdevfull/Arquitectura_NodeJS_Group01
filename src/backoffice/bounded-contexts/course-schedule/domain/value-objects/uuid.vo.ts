import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';

import { UuidIdInvalidException } from '../exceptions/uuid-id';
import { ValueObject } from './value-object';

interface UuidProps {
  value: string;
}

export type uuidIdResult = Result<UuidVO, UuidIdInvalidException>;

export class UuidVO extends ValueObject<UuidProps> {
  private constructor(props: UuidProps) {
    super(props);
  }

  static create(uuid: string): uuidIdResult {
    if (!uuidValidate(uuid)) {
      return err(new UuidIdInvalidException());
    }

    return ok(new UuidVO({ value: uuid }));
  }

  get value() {
    return this.props.value;
  }
}
