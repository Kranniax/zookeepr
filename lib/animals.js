const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
  let personalityTraitArray = [];
  // Note that we save the animalsArray as filteredResults here.
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitArray = [query.personalityTraits];
    } else {
      personalityTraitArray = query.personalityTraits;
    }

    // Loop through each trait in the personalityTraits
    personalityTraitArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter((animals) => animals.id === id)[0];
  return result;
}
function createNewAnimal(body, animalsArray) {
  // our function's main code will go here!
  const animal = body;

  // This won't actually add information to animals.json. Keep in mind that
  // whenever we use require() to import data or functionality, it's only
  // reading the data and creating a copy of it to use in server.js. So nothing
  // we do with the imported data will ever affect the content of the file from
  // which that data came. We'll have to not only use .push() to save the new
  // data in this local server.js copy of our animal data, but we'll also have
  // to import and use the fs library to write that data to animals.json.
  animalsArray.push(animal);

  fs.writeFileSync(
    path.join(__dirname, "../data/animals.json"),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );

  // return finished code to post route for response.
  return animal;
}
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== "string") {
    return false;
  }
  if (!animal.species || typeof animal.species !== "string") {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== "string") {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}
module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
};
