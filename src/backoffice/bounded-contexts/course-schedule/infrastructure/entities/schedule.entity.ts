import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base';

@Entity({ name: 'schedule' })
export class ScheduleEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  scheduleId: string;

  @Column({ type: 'varchar', length: 36 })
  courseId: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'varchar', length: 15 })
  status: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  frequency: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  duration: string;

  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phrase: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  timeStartAndEnd: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  zoomId: string;
}
