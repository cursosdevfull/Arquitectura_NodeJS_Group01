import { InjectionToken, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { TokenDI } from './token.service';
import { BaseApplication, Price, Report } from './base.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ParamsService } from './database/params.service';

export class TestDI {
  getMessage() {
    return 'Message from TestDI';
  }
}

export class Team {
  private layout: any;

  constructor(layout: any) {
    this.layout = layout;
  }

  getLayout() {
    return this.layout;
  }
}

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [
    ParamsService,
    BookService,
    /*     {
      provide: BookService,
      useClass: BookService,
    }, */
    {
      provide: 'NEW_LAYOUT',
      useFactory: (param) => {
        return new Team(param);
      },
      inject: ['LAYOUT'],
    },
    {
      provide: 'LAYOUT_SERVICE',
      useFactory: () => {
        return new TestDI();
      },
    },

    {
      provide: 'LAYOUT',
      useValue: { title: 'App POC', description: 'App POC description' },
    },
    {
      provide: 'GET_REPORT',
      useClass: Report,
    },
    {
      provide: BaseApplication,
      useClass: Price,
    },
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: TokenDI,
      useClass: TestDI,
    },

    {
      provide: 'TASK_SERVICE',
      useFactory: (prefix: string) => new TaskService(prefix),
      inject: ['TASK_PREFIX'],
    },
    {
      provide: 'TASK_PREFIX',
      useValue: 'app-poc',
    },
    //{ provide: TaskService, useValue: new TaskService('cursosdev') },
    /*     {provide: AppService, useClass: AppService} */
  ],
})
export class AppModule {}
