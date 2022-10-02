import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteSessionDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  sessionId: string;
}
