import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 36 })
  refreshToken: string;

  @JoinTable()
  @ManyToMany(() => RoleEntity, (role) => role.users)
  roles: RoleEntity[];
}
