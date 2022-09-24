import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';

import { ScheduleIdInvalidException } from '../exceptions/schedule-id';
import { ValueObject } from './value-object';

interface ScheduleProps {
  value: string;
}

export type scheduleIdResult = Result<ScheduleVO, ScheduleIdInvalidException>;

export class ScheduleVO extends ValueObject<ScheduleProps> {
  private constructor(props: ScheduleProps) {
    super(props);
  }

  static create(uuid: string): scheduleIdResult {
    if (!uuidValidate(uuid)) {
      return err(new ScheduleIdInvalidException());
    }

    return ok(new ScheduleVO({ value: uuid }));
  }

  get value() {
    return this.props.value;
  }
}
