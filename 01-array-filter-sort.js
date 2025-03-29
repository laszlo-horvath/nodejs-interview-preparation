// Exercise:
// - Generate an array of random user objects
// - Sort users by age in descending order
// - Filter users by age > 50
// - Sort users by name in ascending order

// Focus: Array.filter(), Array.sort(), basic JavaScript.

const randomCharacter = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTXYZ';
  const randomInteger = parseInt( (Math.random() * characters.length - 1), 10);
  return characters[randomInteger];
};

const randomName = () => {
  return `${randomCharacter() + randomCharacter() + randomCharacter() + randomCharacter()}`;
};

const createUser = (id) => {
  const age = parseInt(Math.random() * 100, 10);

  return {
    id: String(age * Date.now()).slice(0, 8),
    username: `${randomName()}_${id}`,
    age,
  };
}

const users = [];

for (let index = 0; index < 10; index++) {
  const user = createUser(index + 1);
  users.push(user);
}

console.log('Original array: ', users);

const usersSortedByAge = [...users].sort((a, b) => {
  // ASC
  // return a.age - b.age;

  // DESC
  return b.age - a.age;
});
console.log('Sorted by age DESC: ', usersSortedByAge);

const usersFilteredByAge = [...users].filter(user => user.age > 50);
console.log('Filtered by age > 50: ', usersFilteredByAge);

const usersSortedByName = [...users].sort((a, b) => {
  // ASC
  return a.username.charCodeAt(0) - b.username.charCodeAt(0);
});
console.log('Sorted by name ASC: ', usersSortedByName)