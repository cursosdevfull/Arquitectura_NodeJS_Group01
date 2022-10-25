import { UserFindResult, UserSaveResult } from '../../infrastructure/user.infrastructure';
import { User } from '../aggregates/user';

export interface UserRepository {
  save(user: User): Promise<UserSaveResult>;
  findByEmail(email: string): Promise<UserFindResult>;
  findByRefreshToken(refreshToken: string): Promise<UserFindResult>;
}
