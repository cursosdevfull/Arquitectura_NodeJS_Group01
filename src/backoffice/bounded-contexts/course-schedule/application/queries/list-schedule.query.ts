import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { CourseVO } from '../../domain/value-objects/course-id.vo';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';
import { ScheduleListResult } from '../dtos/schedule-list-result.dto';

export class ListScheduleQuery implements IQuery {
  constructor(public readonly courseId: string) {}
}

@QueryHandler(ListScheduleQuery)
export class ListScheduleQueryHandler
  implements IQueryHandler<ListScheduleQuery, ScheduleListResult[]>
{
  constructor(
    @Inject(ScheduleInfrastructure) private repository: ScheduleRepository,
  ) {}

  async execute(query: ListScheduleQuery): Promise<ScheduleListResult[]> {
    const courseIdResult = CourseVO.create(query.courseId);

    if (courseIdResult.isErr()) {
      throw new BadRequestException(
        courseIdResult.error.message,
        courseIdResult.error.name,
      );
    }

    const courseId = courseIdResult.value;

    const schedulesResult = await this.repository.listByCourseId(
      courseId.value,
    );

    if (schedulesResult.isErr()) {
      throw new InternalServerErrorException(
        schedulesResult.error.message,
        schedulesResult.error.name,
      );
    }

    return schedulesResult.value;
  }
}
