import { err, ok, Result } from 'neverthrow';
import { AppService } from 'src/app.service';

import { ScheduleListResult } from '../application/dtos/schedule-list-result.dto';
import { Schedule } from '../domain/aggregates/schedule';
import { ScheduleRepository } from '../domain/repositories/schedule.repository';
import { ScheduleDTO } from './dtos/schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleCreateDatabaseException } from './exceptions/schedule-create';
import { ScheduleFindByIdDatabaseException, ScheduleNotFoundException } from './exceptions/schedule-find-by-id';
import { ScheduleListByCourseDatabaseException } from './exceptions/schedule-list-by-course';

export type ScheduleCreateResult = Result<
  Schedule,
  ScheduleCreateDatabaseException
>;

export type ScheduleFindByIdResult = Result<
  Schedule,
  ScheduleFindByIdDatabaseException | ScheduleNotFoundException
>;

export type ScheduleFindByCourseIdResult = Result<
  ScheduleListResult[],
  ScheduleNotFoundException
>;

export class ScheduleInfrastructure implements ScheduleRepository {
  async findById(scheduleId: string): Promise<ScheduleFindByIdResult> {
    try {
      const scheduleEntity = await AppService.manager
        .getRepository(ScheduleEntity)
        .findOne({ where: { scheduleId, active: true } });

      if (!scheduleEntity) {
        return err(new ScheduleNotFoundException());
      }

      return ok(ScheduleDTO.fromDataToDomain(scheduleEntity));
    } catch (error) {
      return err(new ScheduleFindByIdDatabaseException(error.sqlMessage));
    }
  }
  async save(schedule: Schedule): Promise<ScheduleCreateResult> {
    try {
      const scheduleEntity = ScheduleDTO.fromDomainToData(schedule);

      const scheduleSaved = await AppService.manager
        .getRepository(ScheduleEntity)
        .save(scheduleEntity);

      return ok(ScheduleDTO.fromDataToDomain(scheduleSaved));
    } catch (error) {
      return err(new ScheduleCreateDatabaseException(error.sqlMessage));
    }
  }

  async listByCourseId(
    courseId: string,
  ): Promise<ScheduleFindByCourseIdResult> {
    try {
      const scheduleEntities = await AppService.manager
        .getRepository(ScheduleEntity)
        .find({ where: { courseId, active: true } });

      if (!scheduleEntities) {
        return err(new ScheduleNotFoundException());
      }

      return ok(ScheduleDTO.fromDataToApplication(scheduleEntities));
    } catch (error) {
      return err(new ScheduleListByCourseDatabaseException(error.sqlMessage));
    }
  }
}
