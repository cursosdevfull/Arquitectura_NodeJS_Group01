import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateSessionIdDTO {
  @ApiProperty({
    type: 'string',
    example: '9b0c6238-29ec-4b94-840d-3d71884e0d73',
    description: 'Session id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  sessionId: string;
}
