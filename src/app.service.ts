import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { ScheduleEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/schedule.entity';
import { SessionEntity } from './backoffice/bounded-contexts/course-schedule/infrastructure/entities/session.entity';

let manager: EntityManager;
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
  }

  static get manager() {
    return manager;
  }
}
