const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats').then(habitats => {
    res.status(200)
    .json({
      status: 'Success',
      data: habitats,
      message: "Retrieved all habitats."
    })
  })
  .catch(err => {
    console.log(error)
    next();
  })
}


const getSingleHabitat = (req, res, next) => {
  const habitatId = Number(req.params.id);
  db.one('SELECT *  FROM habitats WHERE id = ${id}', {
    id: habitatId
  }).then((habitat) => {
    res.status(200)
    .json({
      status: 'Success',
      data: habitat,
      message: 'Retrieved single habitat.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}


const addHabitat = (req, res, next) => {
    const habitat = req.body;
    db.none('INSERT INTO habitats(catergory) VALUES (${catergory})', habitat)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New habitat added!'
      })
    })
    .catch(err => {
      console.log(err);
      next();
    })
 }


module.exports = { getAllHabitats, getSingleHabitat, addHabitat}
