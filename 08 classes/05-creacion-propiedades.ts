/* class Computer {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
} */

class Computer {
  constructor(private name: string, private price: number) {}
}

const computer = new Computer("MacBook Pro", 1000);
console.log(computer);
