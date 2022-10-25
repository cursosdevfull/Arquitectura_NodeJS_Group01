import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
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
import { HeadersMiddleware } from './backoffice/bounded-contexts/course-schedule/interfaces/middlewares/headers.middleware';
import { CreateUserCommandHandler } from './backoffice/bounded-contexts/security/application/commands/create-user.command';
import { LoginQueryHandler } from './backoffice/bounded-contexts/security/application/queries/login-user.query';
import {
  NewAccessTokenQueryHandler,
} from './backoffice/bounded-contexts/security/application/queries/new-access-token.query';
import { CryptService } from './backoffice/bounded-contexts/security/application/services/crypt.service';
import { TokensServices } from './backoffice/bounded-contexts/security/application/services/tokens.service';
import { UserFactory } from './backoffice/bounded-contexts/security/domain/aggregates/user-factory';
import { UserInfrastructure } from './backoffice/bounded-contexts/security/infrastructure/user.infrastructure';
import { SecurityController } from './backoffice/bounded-contexts/security/interfaces/http/security.controller';
import { RedisMiddlewareCreator } from './backoffice/interfaces/middlewares/redis.middleware';

const modules = [
  CqrsModule,
  ConfigModule.forRoot(),
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 30,
  }),
  MulterModule.register({ dest: './public' }),
];
const controllers = [
  ScheduleController,
  SessionController,
  AppController,
  SecurityController,
];
const domain = [SessionFactory, UserFactory];
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
  CreateUserCommandHandler,
  CryptService,
  LoginQueryHandler,
  TokensServices,
  NewAccessTokenQueryHandler,
];

const infrastructure = [
  ScheduleInfrastructure,
  SessionInfrastructure,
  EventSourcingInfrastructure,
  SQSEventPublisher,
  UserInfrastructure,
];
@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [AppService, Logger, ...domain, ...application, ...infrastructure],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedisMiddlewareCreator('team01'), HeadersMiddleware)
      .forRoutes({ path: '/schedule/:courseId', method: RequestMethod.GET });

    consumer
      .apply(RedisMiddlewareCreator('team02'))
      .forRoutes({ path: '/session/:scheduleId', method: RequestMethod.GET });
  }
}
