import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/create-schedule.command';
import {
  DeleteScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/delete-schedule.command';
import { ScheduleController } from './backoffice/bounded-contexts/course-schedule/interfaces/http/schedule.controller';

const modules = [CqrsModule];
const controllers = [AppController, ScheduleController];
const providers = [
  AppService,
  CreateScheduleCommandHandler,
  DeleteScheduleCommandHandler,
];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}
