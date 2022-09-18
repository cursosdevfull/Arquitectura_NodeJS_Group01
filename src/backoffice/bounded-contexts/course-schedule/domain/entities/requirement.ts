import { v4 as uuidv4 } from 'uuid';

import { ScheduleVO } from '../value-objects/schedule-id.vo';

export type RequirementProperties = {
  readonly scheduleId: ScheduleVO;
  readonly text: string;
};

export class Requirement {
  private readonly requirementId: string;
  private readonly scheduleId: ScheduleVO;
  private readonly text: string;

  constructor(properties: RequirementProperties) {
    Object.assign(this, properties);
    this.requirementId = uuidv4();
  }

  properties() {
    return {
      requirementId: this.requirementId,
      scheduleId: this.scheduleId,
      text: this.text,
    };
  }
}
