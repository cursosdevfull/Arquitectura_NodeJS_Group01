import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { ScheduleFactory } from '../../domain/aggregates/schedule.factory';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';
import { courseIdResult, CourseVO } from '../../domain/value-objects/course-id.vo';
import { ScheduleVO } from '../../domain/value-objects/schedule-id.vo';
import { ScheduleInfrastructure } from '../../infrastructure/schedule.infrastructure';
import { ScheduleCreateResponse, ScheduleResponse } from '../dtos/schedule-response.dto';

export class CreateScheduleCommand implements ICommand {
  constructor(
    public readonly courseId: string,
    public readonly subject: string,
    public readonly status: string,
  ) {}
}

@CommandHandler(CreateScheduleCommand)
export class CreateScheduleCommandHandler
  implements ICommandHandler<CreateScheduleCommand, ScheduleCreateResponse>
{
  constructor(
    @Inject(ScheduleInfrastructure) private repository: ScheduleRepository,
  ) {}

  async execute(
    command: CreateScheduleCommand,
  ): Promise<ScheduleCreateResponse> {
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

    const scheduleResult = new ScheduleFactory().create(
      scheduleId,
      courseId,
      subject,
      status,
    );

    if (scheduleResult.isErr()) {
      throw new BadRequestException(
        scheduleResult.error.message,
        scheduleResult.error.name,
      );
    }

    const scheduleCreateResult = await this.repository.save(
      scheduleResult.value,
    );
    if (scheduleCreateResult.isErr()) {
      throw new InternalServerErrorException(
        scheduleCreateResult.error.message,
        scheduleCreateResult.error.name,
      );
    }

    return ScheduleResponse.fromDomainToResponse(scheduleCreateResult.value);
  }
}
