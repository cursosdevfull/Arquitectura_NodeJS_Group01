interface User {
  name: string;
  lastname: string;
  age: number;
  phone: string;
}

const usuario: Partial<User> = { age: 40, name: "Luis", lastname: "Castro" };

const showInfoUser = (user: Partial<User>): void => {
  console.log(`${user.name} ${user.lastname} is ${user.age} years old.`);
};

showInfoUser(usuario);
