import { Address } from './address';
import { Root } from './root';

export interface StudentUpdate {
  name: string;
  age: number;
  city: string;
  state: string;
}

export class Student implements Root {
  private readonly idStudent: number;
  private name: string;
  private age: number;
  private address: Address;

  constructor(
    idStudent: number,
    name: string,
    age: number,
    city: string,
    state: string,
  ) {
    this.idStudent = idStudent;
    this.name = name;
    this.age = age;
    this.address = new Address(city, state);
  }

  properties() {
    return {
      idStudent: this.idStudent,
      name: this.name,
      age: this.age,
      address: this.address,
    };
  }

  update(fields: Partial<StudentUpdate>) {
    this.name = fields.name || this.name;
    this.age = fields.age || this.age;
    this.address.setCity(fields.city || this.address.properties().city);
    this.address.setState(fields.state || this.address.properties().state);
  }
}
