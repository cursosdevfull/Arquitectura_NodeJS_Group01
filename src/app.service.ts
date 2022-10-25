import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DataSource, EntityManager } from 'typeorm';

import { ScheduleEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/schedule.entity';
import { SessionEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/session.entity';
import { RoleEntity } from './backoffice/bounded-contexts/security/infrastructure/entities/role.entity';
import { UserEntity } from './backoffice/bounded-contexts/security/infrastructure/entities/user.entity';
import { Car } from './unit-of-work/entities/Car.entity';
import { User } from './unit-of-work/entities/User.entity';

let manager: EntityManager;

export class SQSConfig {
  readonly url: string;
  readonly region: string;
}
export interface IDBConfigMongo {
  user: string;
  pass: string;
  database: string;
  host: string;
}
@Injectable()
export class AppService {
  private dataSource: DataSource | void;

  constructor(private readonly logger: Logger) {}

  private dbConfig() {
    return {
      host: process.env.host,
      port: +process.env.port,
      database: process.env.database,
      username: process.env.usernameDB,
      password: process.env.password,
      synchronize: true,
      logging: false,
    };
  }

  private dbConfigMongo(): IDBConfigMongo {
    return {
      user: 'user-eventsourcing',
      pass: 'elgigantedeacero2022',
      database: 'eventsourcing',
      host: 'cluster0.2a0hw.mongodb.net',
    };
  }

  async onModuleInit() {
    const entities = [
      ScheduleEntity,
      SessionEntity,
      UserEntity,
      RoleEntity,
      User,
      Car,
    ];
    const config = this.dbConfig();

    this.logger.log('Connecting to database...', config);

    this.dataSource = await new DataSource({
      type: 'mysql',
      ...config,
      entities,
    })
      .initialize()
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    manager = (this.dataSource as DataSource).manager;

    const configMongo = this.dbConfigMongo();
    try {
      await mongoose.connect(
        `mongodb+srv://${configMongo.user}:${configMongo.pass}@${configMongo.host}/${configMongo.database}?retryWrites=true&w=majority`,
      );
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  static get manager() {
    return manager;
  }

  static get SQS_EVENT_CONFIG(): SQSConfig {
    return {
      url: 'https://sqs.us-east-1.amazonaws.com/282865065290/SQS_DDD',
      region: 'us-east-1',
    };
  }
}
