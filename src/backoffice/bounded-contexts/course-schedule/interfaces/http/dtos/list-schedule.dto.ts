import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListScheduleDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  courseId: string;
}
