import { ScheduleVO } from '../value-objects/schedule-id.vo';
import { Schedule } from './schedule';

export class ScheduleFactory {
  create(
    scheduleId: ScheduleVO,
    courseId: string,
    subject: string,
    status: string,
  ) {
    if (subject.trim() === '') throw new Error('Subject is required');

    if (subject.trim().split(' ').length < 5)
      throw new Error('Subject must be at least 5 words');

    if (status.trim() === '') throw new Error('Status is required');

    return new Schedule({ scheduleId, courseId, subject, status });
  }
}
