import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base';

@Entity({ name: 'session' })
export class SessionEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  sessionId: string;

  @Column({ type: 'varchar', length: 36 })
  scheduleId: string;

  @Column({ type: 'datetime' })
  date: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'boolean' })
  active: boolean;
}
