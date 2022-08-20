class Product {
  name: string;
  price: number;
  category: string;
  stock: number;

  info() {
    const price = 300;
    return `${this.name} is ${this.price} and is in the category ${this.category}`;
  }

  showInfo(): string {
    return this.info();
  }
}

class ListProduct {
  products: string[] = [];

  add(source: () => string): void {
    this.products.push(source());
  }
}

const product = new Product();
product.name = "Product";
product.price = 100;
product.category = "Electronics";
product.stock = 10;

console.log("Product: ", product);
console.log("Product info: ", product.info());
console.log("Product showInfo: ", product.showInfo());

const listProduct = new ListProduct();
listProduct.add(product.showInfo.bind(product));

console.log("ListProduct: ", listProduct);
