import { err, ok, Result } from 'neverthrow';
import { AppService } from 'src/app.service';

import { User } from '../domain/aggregates/user';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserDto } from './dtos/user.dto';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { UserFindDatabaseException, UserNotFoundException } from './exceptions/user-find';
import { UserSaveDatabaseException } from './exceptions/user-save';

export type UserSaveResult = Result<User, UserSaveDatabaseException>;
export type UserFindResult = Result<
  User,
  UserFindDatabaseException | UserNotFoundException
>;

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<UserSaveResult> {
    try {
      const userEntity = UserDto.fromDomainToData(user);

      const rolesEntity = await AppService.manager
        .createQueryBuilder(RoleEntity, 'role')
        .where('role.name IN (:...roles)', { roles: userEntity.roles })
        .getMany();

      userEntity.roles = rolesEntity;

      const userSaved = await AppService.manager
        .getRepository(UserEntity)
        .save(userEntity);

      return ok(UserDto.fromDataToDomain(userSaved));
    } catch (error) {
      return err(new UserSaveDatabaseException(error.sqlMessage));
    }
  }

  async findByEmail(email: string): Promise<UserFindResult> {
    try {
      const userRecovered = await AppService.manager
        .getRepository(UserEntity)
        .findOne({
          where: { email },
          relations: ['roles'],
        });

      if (userRecovered) {
        return ok(UserDto.fromDataToDomain(userRecovered));
      } else {
        return err(new UserNotFoundException(email));
      }
    } catch (error) {
      return err(new UserFindDatabaseException(error.sqlMessage));
    }
  }

  async findByRefreshToken(refreshToken: string): Promise<UserFindResult> {
    try {
      const userRecovered = await AppService.manager
        .getRepository(UserEntity)
        .findOne({
          where: { refreshToken },
          relations: ['roles'],
        });

      if (userRecovered) {
        return ok(UserDto.fromDataToDomain(userRecovered));
      } else {
        return err(new UserNotFoundException(refreshToken));
      }
    } catch (error) {
      return err(new UserFindDatabaseException(error.sqlMessage));
    }
  }
}
