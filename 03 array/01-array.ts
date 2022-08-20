const users: string[] = ["John", "Jane", "Mary"];
const books: { title: string; author: string }[] = [
  { title: "Harry Potter", author: "J.K. Rowling" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
];

books.unshift({ title: "The Hobbit", author: "J.R.R. Tolkien" });
books.push({
  title: "The Hobbit: The Battle of the Five Armies",
  author: "J.R.R. Tolkien",
});

console.log("Books:", books);
console.log("Users:", users);

const allItems = [...users, ...books];

console.log("All items:", allItems);
