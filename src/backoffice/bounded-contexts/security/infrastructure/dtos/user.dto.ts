import { User } from '../../domain/aggregates/user';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  static fromDomainToData(user: User): UserEntity {
    return {
      userId: user.properties().userId,
      name: user.properties().name,
      email: user.properties().email,
      password: user.properties().password,
      refreshToken: user.properties().refreshToken,
      roles: user.properties().roles,
    };
  }

  static fromDataToDomain(userEntity: UserEntity): User {
    const resultUserId = UuidVO.create(userEntity.userId);
    const resultRefreshToken = UuidVO.create(userEntity.refreshToken);
    const resultEmail = EmailVO.create(userEntity.email);

    if (
      resultEmail.isOk() &&
      resultUserId.isOk() &&
      resultRefreshToken.isOk()
    ) {
      return new User({
        userId: resultUserId.value,
        name: userEntity.name,
        email: resultEmail.value,
        password: userEntity.password,
        refreshToken: resultRefreshToken.value,
        roles: userEntity.roles,
      });
    }
    return null;
  }
}
