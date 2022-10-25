import { AggregateRoot } from '@nestjs/cqrs';

import { EmailVO } from '../value-objects/email.vo';
import { UuidVO } from '../value-objects/uuid.vo';

export type UserEssentials = {
  userId: UuidVO;
  name: string;
  email: EmailVO;
  password: string;
  refreshToken: UuidVO;
  roles: any[];
};

export type UserProperties = Required<UserEssentials>;

export type UserFieldsUpdate = {
  name: string;
  password: string;
  refreshToken: UuidVO;
  roles: any[];
};

export class User extends AggregateRoot {
  private readonly userId: UuidVO;
  private name: string;
  private readonly email: EmailVO;
  private password: string;
  private refreshToken: UuidVO;
  private roles: any[];

  constructor(props: UserProperties) {
    super();
    Object.assign(this, props);
  }

  properties() {
    return {
      userId: this.userId.value,
      name: this.name,
      email: this.email.value,
      password: this.password,
      refreshToken: this.refreshToken.value,
      roles: this.roles,
    };
  }

  update(fields: Partial<UserFieldsUpdate>) {
    Object.assign(this, fields);
  }
}
