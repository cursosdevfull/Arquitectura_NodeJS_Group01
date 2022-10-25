import { ApiProperty } from '@nestjs/swagger';

import { Session } from '../../domain/aggregates/session';

export class SessionCreateResponse {
  @ApiProperty({
    type: 'string',
    example: '9b0c6238-29ec-4b94-840d-3d71884e0d73',
    description: 'Session id',
    required: true,
  })
  sessionId: string;

  @ApiProperty({
    type: 'string',
    example: '9b0c6238-29ec-4b94-840d-3d71884e0d73',
    description: 'Schedule id',
    required: true,
  })
  scheduleId: string;

  @ApiProperty({
    type: 'date',
    example: '21/10/2022',
    description: 'Date',
    required: true,
  })
  date: Date;
}

export class SessionResponse {
  static fromDomainToResponse(session: Session): SessionCreateResponse {
    return {
      sessionId: session.properties().sessionId.value,
      scheduleId: session.properties().scheduleId.value,
      date: session.properties().date,
    };
  }
}
