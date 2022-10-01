import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from './app.service';
import {
  CreateScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/create-schedule.command';
import {
  DeleteScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/delete-schedule.command';
import {
  UpdateScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/update-schedule.command';
import {
  ListScheduleQueryHandler,
} from './backoffice/bounded-contexts/course-schedule/application/queries/list-schedule.query';
import {
  ScheduleInfrastructure,
} from './backoffice/bounded-contexts/course-schedule/infrastructure/schedule.infrastructure';
import { ScheduleController } from './backoffice/bounded-contexts/course-schedule/interfaces/http/schedule.controller';

const modules = [CqrsModule];
const controllers = [ScheduleController];
const application = [
  CreateScheduleCommandHandler,
  DeleteScheduleCommandHandler,
  UpdateScheduleCommandHandler,
  ListScheduleQueryHandler,
];

const infrastructure = [ScheduleInfrastructure];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, ...application, ...infrastructure],
})
export class AppModule {}
