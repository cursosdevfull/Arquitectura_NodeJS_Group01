class Personal {
  private name: string;
  private lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

class PersonalAdministrativo extends Personal {
  private departamento: string;

  constructor(name: string, lastname: string, departamento: string) {
    super(name, lastname);
    //super()
    this.departamento = departamento;
  }

  toUpperCase(txt: string): string {
    return txt.toUpperCase();
  }
}

const personal = new Personal("Sergio", "Hidalgo");
console.log(personal);

const personalAdministrativo = new PersonalAdministrativo(
  "Sergio",
  "Hidalgo",
  "Informática"
);
console.log(personalAdministrativo);
