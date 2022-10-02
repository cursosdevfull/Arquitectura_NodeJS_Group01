import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSessionDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  scheduleId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}
