export class ScheduleListResult {
  readonly scheduleId: string;
  readonly courseId: string;
  readonly subject: string;
  readonly status: string;
  readonly frequency: string;
  readonly duration: string;
  readonly startDate: Date;
  readonly phrase: string;
  readonly timeStartAndEnd: string;
  readonly zoomId: string;
  readonly totalHours: number;
}
