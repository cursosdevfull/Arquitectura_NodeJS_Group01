import { err, ok, Result } from 'neverthrow';
import { validate as uuidValidate } from 'uuid';

import { CourseIdInvalidException } from '../exceptions/course-id';
import { ValueObject } from './value-object';

interface CourseProps {
  value: string;
}

export type courseIdResult = Result<CourseVO, CourseIdInvalidException>;

export class CourseVO extends ValueObject<CourseProps> {
  private constructor(props: CourseProps) {
    super(props);
  }

  static create(uuid: string): courseIdResult {
    if (!uuidValidate(uuid)) {
      return err(new CourseIdInvalidException());
    }

    return ok(new CourseVO({ value: uuid }));
  }

  get value() {
    return this.props.value;
  }
}
