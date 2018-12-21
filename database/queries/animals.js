const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals').then(animals => {
    res.status(200)
    .json({
      status: 'Success',
      data: animals,
      message: "Retrieved all animals."
    })
  })
  .catch(err => {
    console.log(error)
    next();
  })
}

const getSingleAnimal = (req, res, next) => {
  const animalId = Number(req.params.id);
  db.one('SELECT * FROM animals WHERE id = ${id}', {
    id: animalId
  }).then((animal) => {
    res.status(200)
    .json({
      status: 'Success',
      data: animal,
      message: 'Retrieved single animal.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}




const addAnimal = (req, res, next) => {
  const animal = req.body;
  if (req.body.species_id) {
      req.body.species_id = parseInt(req.body.species_id);
    }
    db.none('INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})', animal)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New animal added!'
      })
    })
    .catch(err => {
      console.log('Please add a species id.');
      next();
    })
 }

const updateAnimal = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  if(req.body.species_id && req.body.species_id.toLowerCase() === "null") {
    req.body.species_id = null;
  }
  db.none(
      "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id,
      req.body
    )
    .then(() => {
    res.status(200)
    .json({
      status: 'Sucess!',
      message: 'Animal has been updated!'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}

const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id = $1', animalId).
  then(animal => {
      res.status(200).json({
        status: "success",
        message: "You killed an animal. :( )",
        result: animal
      });
    })
    .catch(err => {
    console.log(err);
    next();
  })
};

module.exports = {
  getAllAnimals, getSingleAnimal, addAnimal, updateAnimal, deleteAnimal }
