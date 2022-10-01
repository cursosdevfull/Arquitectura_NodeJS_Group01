import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateScheduleDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
