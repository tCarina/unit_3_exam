const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllSpecies = (req, res, next) => {
  db.any('SELECT * FROM species').then(species => {
    res.status(200)
    .json({
      status: 'Success',
      data: species,
      message: "Retrieved all species."
    })
  })
  .catch(err => {
    console.log(error)
    next();
  })
}

const getSingleSpecies = (req, res, next) => {
  const speciesId = Number(req.params.id);
  db.one('SELECT *  FROM species WHERE id = ${id}', {
    id: speciesId
  }).then((species) => {
    res.status(200)
    .json({
      status: 'Success',
      data: species,
      message: 'Retrieved single species.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}


const addSpecies = (req, res, next) => {
    const species = req.body;
    db.none('INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})', species)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New species added!'
      })
    })
    .catch(err => {
      console.log('Please add a species id.');
      next();
    })
 }


module.exports = {
  getAllSpecies, getSingleSpecies, addSpecies }
