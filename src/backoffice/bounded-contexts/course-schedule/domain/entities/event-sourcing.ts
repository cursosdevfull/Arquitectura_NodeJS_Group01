import { v4 as uuidv4 } from 'uuid';

export class EventSourcing {
  private readonly identifier: string;
  private readonly timestamp: number;
  private readonly recordId: string;
  private readonly entity: string;
  private readonly action: string;
  private readonly data: object;

  constructor(recordId: string, entity: string, action: string, data: object) {
    this.identifier = uuidv4();
    this.timestamp = new Date().getTime();
    this.recordId = recordId;
    this.entity = entity;
    this.action = action;
    this.data = data;
  }

  properties() {
    return {
      identifier: this.identifier,
      timestamp: this.timestamp,
      recordId: this.recordId,
      entity: this.entity,
      action: this.action,
      data: this.data,
    };
  }
}
