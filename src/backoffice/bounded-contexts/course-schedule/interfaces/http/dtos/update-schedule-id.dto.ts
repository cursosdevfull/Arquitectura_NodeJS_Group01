import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateScheduleIdDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  scheduleId: string;
}
