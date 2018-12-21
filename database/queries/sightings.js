const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
  .then(sightings => {
    res.status(200)
    .json({
      status: 'Success',
      data: sightings,
      message: "Retrieved all sightings."
    })
  })
  .catch(err => {
    console.log('error')
    next();
  })
}

const getSingleSighting = (req, res, next) => {
  const sightingsId = Number(req.params.id);
  db.one('SELECT *  FROM sightings WHERE id = ${id}', {
    id: sightingsId
  }).then((sightings) => {
    res.status(200)
    .json({
      status: 'Success',
      data: sightings,
      message: 'Retrieved single sighting.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}


const addSighting = (req, res, next) => {
  const sighting = req.body;
  if (req.body.researcher_id) {
      req.body.researcher_id = parseInt(req.body.researcher_id)
    }
    if (req.body.species_id) {
      req.body.species_id = parseInt(req.body.species_id);
    }
    if (req.body.habitat_id) {
        req.body.habitat_id = parseInt(req.body.habitat_id)
      }
    db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (${researcher_id}, {species_id}, ${habitat_id})', sighting)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New sighting added!'
      })
    })
    .catch(err => {
      console.log(error);
      next();
    })
 }

module.exports = { getAllSightings, getSingleSighting, addSighting }
