export abstract class BaseApplication {
  abstract getTotal(): number;
}

export class Price extends BaseApplication {
  getTotal(): number {
    return 100;
  }
}

type ITotal = {
  total: number;
  totalPaid: number;
};

export interface IReport {
  getSummaryAccount(): ITotal;
}

export class Report {
  getSummaryAccount() {
    return {
      total: 100,
      totalPaid: 50,
    };
  }
}
