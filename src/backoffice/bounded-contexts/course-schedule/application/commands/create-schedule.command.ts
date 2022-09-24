import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { ScheduleFactory } from '../../domain/aggregates/schedule.factory';
import { courseIdResult, CourseVO } from '../../domain/value-objects/course-id.vo';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';

export class CreateScheduleCommand implements ICommand {
  constructor(
    public readonly courseId: string,
    public readonly subject: string,
    public readonly status: string,
  ) {}
}

@CommandHandler(CreateScheduleCommand)
export class CreateScheduleCommandHandler
  implements ICommandHandler<CreateScheduleCommand, any>
{
  execute(command: CreateScheduleCommand): Promise<any> {
    const { courseId, subject, status } = command;

    const courseIdResult = CourseVO.create(courseId);
    if (courseIdResult.isErr()) {
      throw new BadRequestException(
        courseIdResult.error.message,
        courseIdResult.error.name,
      );
    }

    const scheduleIdResult = ScheduleVO.create(uuidv4());

    if (scheduleIdResult.isErr()) {
      throw new InternalServerErrorException(
        scheduleIdResult.error.message,
        scheduleIdResult.error.name,
      );
    }

    const scheduleId = scheduleIdResult.value;

    const schedule = new ScheduleFactory().create(
      scheduleId,
      courseId,
      subject,
      status,
    );

    return Promise.resolve();
  }
}
