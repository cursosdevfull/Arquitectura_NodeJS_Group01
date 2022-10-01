import {
  ScheduleCreateResult,
  ScheduleFindByCourseIdResult,
  ScheduleFindByIdResult,
} from '../../infrastructure/schedule.infrastructure';
import { Schedule } from '../aggregates/schedule';

export interface ScheduleRepository {
  save(schedule: Schedule): Promise<ScheduleCreateResult>;
  findById(scheduleId: string): Promise<ScheduleFindByIdResult>;
  listByCourseId(courseId: string): Promise<ScheduleFindByCourseIdResult>;
}
