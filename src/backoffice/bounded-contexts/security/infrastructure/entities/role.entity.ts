import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  roleId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
