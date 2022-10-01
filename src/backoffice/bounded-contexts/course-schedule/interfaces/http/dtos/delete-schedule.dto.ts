import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteScheduleDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  scheduleId: string;
}
