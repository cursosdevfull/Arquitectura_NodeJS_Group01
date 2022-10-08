import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DataSource, EntityManager } from 'typeorm';

import { ScheduleEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/schedule.entity';
import { SessionEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/session.entity';

let manager: EntityManager;

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
      host: 'localhost',
      port: 3307,
      database: 'cursosdev',
      username: 'cursosdev',
      password: '12345',
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
}
