class DBConnection {
  static instance: DBConnection;
  private HOST: string = "localhost";
  private PORT: number = 3306;

  private constructor() {}

  static getInstance(): DBConnection {
    if (!this.instance) {
      this.instance = new DBConnection();
    }

    return this.instance;
  }

  getConnection(): string {
    return `http://${this.HOST}:${this.PORT}`;
  }
}

//const dbConnection = new DBConnection();
console.log("Connection", DBConnection.getInstance().getConnection());
