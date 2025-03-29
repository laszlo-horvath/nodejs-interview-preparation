// Exercise: Write a Node.js function that sequentially fetches data
// from two mock endpoints and merges results.

// Focus: Async programming, Promises, Error Handling, async/await.

// Goal: Reinforce asynchronous behavior and error handling in Node.js.

// API 1
const SUPERHERO_API_URL = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json'

const MAX_SUPERHEROES = 563;
const randomSuperheroId = parseInt(Math.random() * MAX_SUPERHEROES - 1);

// API 2
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

const fetchSuperheros = async () => {
  try {
    const superheroesResponse = await fetch(SUPERHERO_API_URL);
    const superheroes = await superheroesResponse.json();
    // console.log('--- Superheroes:', superheroes);

    return superheroes;
  } catch (error) {
    console.error('Error in fetching Superheros API', error);
  }
};

const fetchDog = async () => {
  try {
    const randomDogImageResponse = await fetch(DOG_API_URL);
    const randomDogImage = await randomDogImageResponse.json();
    // console.log('--- Dog:', randomDogImage);

    return randomDogImage;
  } catch (error) {
    console.error('Error in fetching Dog API', error);
  }
};

const fetchSequentially = async () => {
  const superHeroes = await fetchSuperheros();
  const dogImage = await fetchDog();

  const randomSuperHero = superHeroes.find(superHero => superHero.id === randomSuperheroId);
  const mergedObject = {
    superhero: {
      ...randomSuperHero,
    },
    dog: {
      ...dogImage,
    },
  };
  console.log('Merged objects #1: ', mergedObject);

  return mergedObject;
};
fetchSequentially();

const fetchInParallel = async () => {
  const fetchResult = await Promise.all([
    fetchSuperheros(),
    fetchDog()
  ]);

  const mergedSuperHeroAndDog = { ...fetchResult[0][randomSuperheroId], ...fetchResult[1] };
  console.log('--- Merged objects #2:', mergedSuperHeroAndDog);

  return mergedSuperHeroAndDog;
};
fetchInParallel();