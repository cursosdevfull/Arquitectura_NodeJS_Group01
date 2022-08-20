interface ProductRequired {
  name: string;
  price: number;
}

interface ProductOptional {
  category: string;
  stock: number;
}

type ProductProperties = ProductRequired & ProductOptional;

const properties: ProductProperties = {
  name: "Product",
  price: 100,
  category: "Electronics",
  stock: 10,
};
