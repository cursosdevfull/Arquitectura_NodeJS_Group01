import {
  SessionCreateResult,
  SessionFindByIdResult,
  SessionFindByScheduleIdResult,
} from '../../infrastructure/session.infrastructure';
import { Session } from '../aggregates/session';

export interface SessionRepository {
  save(session: Session): Promise<SessionCreateResult>;
  findById(sessionId: string): Promise<SessionFindByIdResult>;
  listByScheduleId(scheduleId: string): Promise<SessionFindByScheduleIdResult>;
}
