import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppService } from './app.service';
import {
  CreateScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/create-schedule.command';
import {
  CreateSessionCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/create-session.command';
import {
  DeleteScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/delete-schedule.command';
import {
  DeleteSessionCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/delete-session.command';
import {
  UpdateScheduleCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/update-schedule.command';
import {
  UpdateSessionCommandHandler,
} from './backoffice/bounded-contexts/course-schedule/application/commands/update-session.command';
import { SessionCreateHandler } from './backoffice/bounded-contexts/course-schedule/application/events/session-created';
import { SessionDeletedHandler } from './backoffice/bounded-contexts/course-schedule/application/events/session-deleted';
import { SessionUpdateddHandler } from './backoffice/bounded-contexts/course-schedule/application/events/session-updated';
import {
  EventSourcingSessionCreateHandler,
} from './backoffice/bounded-contexts/course-schedule/application/events/sourcing/evt-session-created';
import {
  EventSourcingSessionDeleteHandler,
} from './backoffice/bounded-contexts/course-schedule/application/events/sourcing/evt-session-deleted';
import {
  EventSourcingSessionUpdateHandler,
} from './backoffice/bounded-contexts/course-schedule/application/events/sourcing/evt-session-updated';
import {
  ListScheduleQueryHandler,
} from './backoffice/bounded-contexts/course-schedule/application/queries/list-schedule.query';
import {
  ListSessionQueryHandler,
} from './backoffice/bounded-contexts/course-schedule/application/queries/list-session.query';
import { SessionFactory } from './backoffice/bounded-contexts/course-schedule/domain/aggregates/session.factory';
import {
  EventSourcingInfrastructure,
} from './backoffice/bounded-contexts/course-schedule/infrastructure/event-sourcing.infrastructure';
import {
  SQSEventPublisher,
} from './backoffice/bounded-contexts/course-schedule/infrastructure/publisher/sqs-event.publisher';
import {
  ScheduleInfrastructure,
} from './backoffice/bounded-contexts/course-schedule/infrastructure/schedule.infrastructure';
import { SessionInfrastructure } from './backoffice/bounded-contexts/course-schedule/infrastructure/session.infrastructure';
import { ScheduleController } from './backoffice/bounded-contexts/course-schedule/interfaces/http/schedule.controller';
import { SessionController } from './backoffice/bounded-contexts/course-schedule/interfaces/http/session.controller';

const modules = [CqrsModule, ConfigModule.forRoot()];
const controllers = [ScheduleController, SessionController];
const domain = [SessionFactory];
const application = [
  CreateScheduleCommandHandler,
  DeleteScheduleCommandHandler,
  UpdateScheduleCommandHandler,
  ListScheduleQueryHandler,
  CreateSessionCommandHandler,
  DeleteSessionCommandHandler,
  UpdateSessionCommandHandler,
  ListSessionQueryHandler,
  SessionCreateHandler,
  SessionDeletedHandler,
  SessionUpdateddHandler,
  EventSourcingSessionCreateHandler,
  EventSourcingSessionUpdateHandler,
  EventSourcingSessionDeleteHandler,
];

const infrastructure = [
  ScheduleInfrastructure,
  SessionInfrastructure,
  EventSourcingInfrastructure,
  SQSEventPublisher,
];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, ...domain, ...application, ...infrastructure],
})
export class AppModule {}
