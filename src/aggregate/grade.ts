import { Root } from './root';

export class Grade implements Root {
  private grade: number;
  private readonly idCourse: number;
  private readonly idStudent: number;

  constructor(idCourse: number, idStudent: number, grade: number) {
    this.grade = grade;
    this.idCourse = idCourse;
    this.idStudent = idStudent;
  }

  properties() {
    return {
      grade: this.grade,
      idCourse: this.idCourse,
      idStudent: this.idStudent,
    };
  }
}
