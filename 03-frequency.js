// Frequency Counting (Medium)

// Exercise: Implement a Node.js function that takes a string
// (like a username or bet slip) and returns a frequency map of characters or items.

// Focus: Algorithmic complexity, optimal solutions using hashing (Map or objects).

// Goal: Practice optimized logic within JavaScript.

const getFrequency = (stringValue) => {
  const charactersMap = {};

  [...stringValue].forEach((character) => {
    if (charactersMap[character] === undefined) {
      charactersMap[character] = 0;
    }

    charactersMap[character] += 1;
  });

  return charactersMap;
};

const frequency = getFrequency('AbaBAaBACaCAcCAbdSDAaDBWFSwEDDABsdDaB');

console.log('Frequency: ', frequency);