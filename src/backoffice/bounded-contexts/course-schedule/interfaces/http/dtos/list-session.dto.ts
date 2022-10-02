import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListSessionDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  scheduleId: string;
}
