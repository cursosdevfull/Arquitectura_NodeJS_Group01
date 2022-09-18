import { validate as uuidValidate } from 'uuid';

import { ValueObject } from './value-object';

interface ScheduleProps {
  value: string;
}

export class ScheduleVO extends ValueObject<ScheduleProps> {
  private constructor(props: ScheduleProps) {
    super(props);
  }

  static create(uuid: string) {
    if (!uuidValidate(uuid)) throw new Error('Invalid UUID');

    return new ScheduleVO({ value: uuid });
  }

  get value() {
    return this.props.value;
  }
}
