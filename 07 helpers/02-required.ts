interface User {
  name: string;
  lastname: string;
  age: number;
  phone: string;
}

const usuario2: Required<User> = {
  name: "Luis",
  lastname: "Castro",
  age: 40,
  phone: "55555555",
};

interface ProductRequired {
  name: string;
  price: number;
}

interface ProductOptional {
  category: string;
  stock: number;
}

type Properties = Required<ProductRequired> & Partial<ProductOptional>;

const setProperties = (properties: Properties): void => {
  console.log(properties.name);
  console.log(properties.price);
  console.log(properties.category);
  console.log(properties.stock);
};

const generatedProperties: Properties = {
  name: "Product",
  price: 100,
  category: "Electronics",
};

setProperties(generatedProperties);
