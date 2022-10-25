import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Car } from './Car.entity';

@Entity({name: 'usuarios'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @ManyToMany((type) => Car, (car) => car.users, {
    cascade: true /*, eager: true*/,
  })
  cars: Promise<Car[]>;
}
