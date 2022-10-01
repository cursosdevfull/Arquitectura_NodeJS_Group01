import { Schedule } from '../../domain/aggregates/schedule';

export interface ScheduleCreateResponse {
  scheduleId: string;
  courseId: string;
  subject: string;
  status: string;
}

export class ScheduleResponse {
  static fromDomainToResponse(schedule: Schedule): ScheduleCreateResponse {
    return {
      scheduleId: schedule.properties().scheduleId.value,
      courseId: schedule.properties().courseId,
      subject: schedule.properties().subject,
      status: schedule.properties().status,
    };
  }
}
