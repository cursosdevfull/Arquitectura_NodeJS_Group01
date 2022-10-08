import { Address } from './aggregate/address';
import { Grade } from './aggregate/grade';
import { Student } from './aggregate/student';

const student = new Student(1, 'John', 21, 'New York', 'NY');

const grades = [new Grade(1, 1, 90), new Grade(2, 1, 80), new Grade(3, 1, 70)];

grades.push(new Grade(4, 1, 60));

const address = new Address('Chicago', 'IL');
