class Service {
  static PORT: number = 4000;
  static HOST: string = "localhost";

  static getUrl(): string {
    return `http://${this.HOST}:${this.PORT}`;
  }

  getUrlApi(): string {
    return `http://${Service.HOST}:${Service.PORT}`;
  }
}

console.log("PORT", Service.PORT);
console.log("HOST", Service.HOST);
console.log("URL", Service.getUrl());

const service = new Service();
console.log("URL API", service.getUrlApi());

class CourseIdInvalidException extends Error {
  constructor() {
    super(CourseIdInvalidException.getMessage());
  }

  static getMessage() {
    return "Id no es un UUID válido";
  }
}

const exception = new CourseIdInvalidException();
console.log("Exception", exception);
