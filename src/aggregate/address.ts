export class Address {
  private city: string;
  private state: string;

  constructor(city: string, state: string) {
    this.city = city;
    this.state = state;
  }

  properties() {
    return {
      city: this.city,
      state: this.state,
    };
  }

  setCity(city: string) {
    this.city = city;
  }

  setState(state: string) {
    this.state = state;
  }
}
