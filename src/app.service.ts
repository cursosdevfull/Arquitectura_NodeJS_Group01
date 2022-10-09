import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DataSource, EntityManager } from 'typeorm';

import { ScheduleEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/schedule.entity';
import { SessionEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/session.entity';

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

  private dbConfig() {
    return {
      host: 'database-1.cmuv7any6zxa.us-east-1.rds.amazonaws.com',
      port: 3306,
      database: 'cursosdev',
      username: 'admin',
      password: 'elgigantedeacero2015',
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
    const entities = [ScheduleEntity, SessionEntity];
    const config = this.dbConfig();

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
