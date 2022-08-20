class Student {
  private readonly id: number;
  private readonly email: string;
  private password: string;
  private name: string;
  private lastname: string;

  constructor(name: string, lastname: string, email: string, password: string) {
    this.id = Math.floor(Math.random() * 100);
    this.email = email;
    this.name = name;
    this.lastname = lastname;
  }

  setNewName(name: string): void {
    this.name = name;
  }

  setNewLastname(lastname: string): void {
    this.lastname = lastname;
  }
}

const student = new Student("Luis", "Castro", "lcastro@correo.com", "123456");
console.log(student);
