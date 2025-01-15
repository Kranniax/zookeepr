const fs = require("fs");
const path = require("path");


function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;

  if (query.age) {
    filteredResults = filteredResults.filter(
      // Since our form data will be coming in as strings, and our JSON is storing
      // age as a number, we must convert the query string to a number to
      // perform a comparison:
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, zookeepers) {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
}
function createNewZookeeper(body, zookeepers) {
  // our function's main code will go here!
  const zookeeper = body;

  // This won't actually add information to animals.json. Keep in mind that
  // whenever we use require() to import data or functionality, it's only
  // reading the data and creating a copy of it to use in server.js. So nothing
  // we do with the imported data will ever affect the content of the file from
  // which that data came. We'll have to not only use .push() to save the new
  // data in this local server.js copy of our animal data, but we'll also have
  // to import and use the fs library to write that data to animals.json.
  zookeepers.push(zookeeper);

  fs.writeFileSync(
    path.join(__dirname, "../data/zookeepers.json"),
    JSON.stringify({zookeepers}, null, 2)
  );

  // return finished code to post route for response.
  return zookeeper;
}
function validateZookeeper(zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  if (
    !zookeeper.favoriteAnimal ||
    typeof zookeeper.favoriteAnimal !== "string"
  ) {
    return false;
  }
  return true;
}
module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};
