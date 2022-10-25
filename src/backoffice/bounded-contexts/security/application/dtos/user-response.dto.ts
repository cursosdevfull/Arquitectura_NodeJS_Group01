import { User } from '../../domain/aggregates/user';

export interface UserResponse {
  userId: string;
  name: string;
  email: string;
}

export class UserResponseDto {
  static fromApplicationToResponse(user: User): UserResponse {
    return {
      userId: user.properties().userId,
      name: user.properties().name,
      email: user.properties().email,
    };
  }
}
