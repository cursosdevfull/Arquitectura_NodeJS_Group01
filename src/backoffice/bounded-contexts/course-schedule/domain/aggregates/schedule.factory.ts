import { err, ok, Result } from 'neverthrow';

import { ScheduleSubjectEmptyException, ScheduleWordsEnoughException } from '../exceptions/schedule-subject';
import { StatusEmptyException } from '../exceptions/status';
import { ScheduleVO } from '../value-objects/schedule-id.vo';
import { Schedule } from './schedule';

export type ScheduleFactoryResult = Result<
  Schedule,
  | ScheduleSubjectEmptyException
  | ScheduleWordsEnoughException
  | StatusEmptyException
>;

export class ScheduleFactory {
  create(
    scheduleId: ScheduleVO,
    courseId: string,
    subject: string,
    status: string,
  ): ScheduleFactoryResult {
    if (subject.trim() === '') return err(new ScheduleSubjectEmptyException());

    if (subject.trim().split(' ').length < 5)
      return err(new ScheduleWordsEnoughException());

    if (status.trim() === '') return err(new StatusEmptyException());

    return ok(new Schedule({ scheduleId, courseId, subject, status }));
  }
}
