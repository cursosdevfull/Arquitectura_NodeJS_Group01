import { v4 as uuidv4 } from 'uuid';

import { ScheduleVO } from '../value-objects/schedule-id.vo';

export type GoalProperties = {
  readonly scheduleId: ScheduleVO;
  readonly text: string;
};

export class Goal {
  private readonly goalId: string;
  private readonly scheduleId: ScheduleVO;
  private readonly text: string;

  constructor(properties: GoalProperties) {
    Object.assign(this, properties);
    this.goalId = uuidv4();
  }

  properties() {
    return {
      goalId: this.goalId,
      scheduleId: this.scheduleId,
      text: this.text,
    };
  }
}
