import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateSessionIdDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  sessionId: string;
}
