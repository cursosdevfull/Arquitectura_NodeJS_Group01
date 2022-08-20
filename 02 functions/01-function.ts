function getFullname(name: string, lastname: string): string {
  return `${name} ${lastname}`;
}

const setFullName = (name: string, lastname: string): string => {
  const userName = name;
  const userLastname = lastname;

  return `Saved: ${name} ${lastname}`;
};

console.log(getFullname("Sergio", "Hidalgo"));
console.log(setFullName("Sergio", "Hidalgo"));
