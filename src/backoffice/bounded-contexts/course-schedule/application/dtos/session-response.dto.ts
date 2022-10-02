import { Session } from '../../domain/aggregates/session';

export interface SessionCreateResponse {
  sessionId: string;
  scheduleId: string;
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
