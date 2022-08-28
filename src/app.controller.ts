import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseApplication, IReport } from './base.service';
import { TaskService } from './task.service';
import { TokenDI } from './token.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    appTokenDI: TokenDI,
    priceService: BaseApplication,
    @Inject('GET_REPORT') reportService: IReport,
    @Inject('LAYOUT') layout: any,
    @Inject('LAYOUT_SERVICE') layoutService: any,
    @Inject('NEW_LAYOUT') newLayout: any,
    /*  @Inject('TASK_SERVICE') task: any, */
  ) {
    const obj = reportService.getSummaryAccount();
    console.log(obj.total, obj.totalPaid);
    console.log(layout);
    console.log(layoutService.getMessage());
    console.log(newLayout.getLayout());

    console.log(appTokenDI.getMessage());
    console.log('total', priceService.getTotal());
    //console.log(task.getTasks());
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  listUsers(): any[] {
    return this.appService.getUsers();
  }
}
