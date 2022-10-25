import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSessionDTO {
  @ApiProperty({
    type: 'string',
    example: '9b0c6238-29ec-4b94-840d-3d71884e0d73',
    description: 'Schedule id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  scheduleId: string;

  @ApiProperty({
    type: 'date',
    example: '2022-10-21',
    description: 'Session Date',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    type: 'number',
    example: '5',
    description: 'Hours',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}
