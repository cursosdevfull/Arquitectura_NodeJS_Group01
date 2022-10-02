import { ScheduleListResult } from '../../application/dtos/schedule-list-result.dto';
import { Schedule, ScheduleProperties } from '../../domain/aggregates/schedule';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';
import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleDTO {
  static fromDomainToData(schedule: Schedule): ScheduleEntity {
    const scheduleEntity = new ScheduleEntity();
    scheduleEntity.scheduleId = schedule.properties().scheduleId.value;
    scheduleEntity.courseId = schedule.properties().courseId;
    scheduleEntity.subject = schedule.properties().subject;
    scheduleEntity.status = schedule.properties().status;
    scheduleEntity.active = schedule.properties().active;
    scheduleEntity.createdAt = schedule.properties().createdAt;
    scheduleEntity.updatedAt = schedule.properties().updatedAt;
    scheduleEntity.deletedAt = schedule.properties().deletedAt;
    scheduleEntity.frequency = schedule.properties().frequency;
    scheduleEntity.duration = schedule.properties().duration;
    scheduleEntity.startDate = schedule.properties().startDate;
    scheduleEntity.phrase = schedule.properties().phrase;
    scheduleEntity.timeStartAndEnd = schedule.properties().timeStartAndEnd;
    scheduleEntity.zoomId = schedule.properties().zoomId;
    scheduleEntity.totalHours = schedule.properties().totalHours;

    return scheduleEntity;
  }

  static fromDataToDomain(scheduleEntity: ScheduleEntity): Schedule {
    const result = ScheduleVO.create(scheduleEntity.scheduleId);

    if (result.isOk()) {
      const scheduleProperties: ScheduleProperties = {
        scheduleId: result.value,
        courseId: scheduleEntity.courseId,
        subject: scheduleEntity.subject,
        status: scheduleEntity.status,
        frequency: scheduleEntity.frequency,
        duration: scheduleEntity.duration,
        startDate: scheduleEntity.startDate,
        phrase: scheduleEntity.phrase,
        timeStartAndEnd: scheduleEntity.timeStartAndEnd,
        zoomId: scheduleEntity.zoomId,
        totalHours: scheduleEntity.totalHours,
      };
      return new Schedule(scheduleProperties);
    } else {
      return null;
    }
  }

  static fromDataToApplication(
    scheduleEntities: ScheduleEntity[],
  ): ScheduleListResult[] {
    return scheduleEntities.map((scheduleEntity) => ({
      scheduleId: scheduleEntity.scheduleId,
      courseId: scheduleEntity.courseId,
      subject: scheduleEntity.subject,
      status: scheduleEntity.status,
      frequency: scheduleEntity.frequency,
      duration: scheduleEntity.duration,
      startDate: scheduleEntity.startDate,
      phrase: scheduleEntity.phrase,
      timeStartAndEnd: scheduleEntity.timeStartAndEnd,
      zoomId: scheduleEntity.zoomId,
      totalHours: scheduleEntity.totalHours,
    }));
  }
}
