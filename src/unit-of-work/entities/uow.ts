import { EntityManager, QueryRunner } from 'typeorm';

export interface IUnitOfWork {
  start(): void;
  complete(work: () => Promise<void>): Promise<void>;
  getManager(): EntityManager;
}

export class UnitOfWork implements IUnitOfWork {
  private readonly queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  constructor(manager: EntityManager) {
    this.queryRunner = manager.connection.createQueryRunner();
  }

  private setTransaction() {
    this.transactionManager = this.queryRunner.manager;
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransaction();
  }
  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
      console.log('Transaction committed');
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      console.log('Transaction rolled back');
    } finally {
      await this.queryRunner.release();
    }
  }
  getManager(): EntityManager {
    if (
      !this.transactionManager ||
      !(this.transactionManager instanceof EntityManager)
    ) {
      throw new Error('Transaction not started');
    }

    return this.transactionManager;
  }
}
