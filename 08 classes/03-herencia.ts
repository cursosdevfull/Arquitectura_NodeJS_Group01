class Team {
  protected type: string;
  protected code: string;
}

class Printer extends Team {
  getInfo(): string {
    return `${this.type}: ${this.code}`;
  }

  setInfo(type: string, code: string): void {
    this.type = type;
    this.code = code;
  }
}

const printer = new Printer();
printer.setInfo("Printer", "12345");
/* printer.type = "Printer";
printer.code = "123"; */

console.log(printer.getInfo());
