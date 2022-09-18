import { v4 as uuidv4 } from 'uuid';

import { ScheduleVO } from '../value-objects/schedule-id.vo';

export type SyllabusProperties = {
  readonly scheduleId: ScheduleVO;
  readonly text: string;
};

export class Syllabus {
  private readonly syllabusId: string;
  private readonly scheduleId: ScheduleVO;
  private readonly text: string;

  constructor(properties: SyllabusProperties) {
    Object.assign(this, properties);
    this.syllabusId = uuidv4();
  }

  properties() {
    return {
      syllabusId: this.syllabusId,
      scheduleId: this.scheduleId,
      text: this.text,
    };
  }
}
