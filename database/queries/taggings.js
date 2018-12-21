const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings').then(taggings => {
    res.status(200)
    .json({
      status: 'Success',
      data: taggings,
      message: "Retrieved all taggings."
    })
  })
  .catch(err => {
    console.log(error)
    next();
  })
}

const getSingleTagging = (req, res, next) => {
  const taggingId = Number(req.params.id);
  db.one('SELECT *  FROM taggings WHERE id = ${id}', {
    id: taggingId
  }).then((tagging) => {
    res.status(200)
    .json({
      status: 'Success',
      data: tagging,
      message: 'Retrieved single tagging.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}


const addTagging = (req, res, next) => {
  if (req.body.animal_id) {
      req.body.animal_id = parseInt(req.body.animal_id);
    }
    if (req.body.researcher_id) {
        req.body.researcher_id = parseInt(req.body.researcher_id);
      }
    const tagging = req.body;
    db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES (${animal_id}, ${researcher_id})', tagging)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New tagging added!'
      })
    })
    .catch(err => {
      console.log(err);
      next();
    })
 }

 const getResearcherTaggings =  (req, res, next) => {
   const researcherId = Number(req.params.id);
   db.any('SELECT * FROM taggings WHERE researcher_id = $1', [researcherId]
   )
   .then((taggings) => {
     res.status(200)
     .json({
       status: 'Success',
       data: taggings,
       message: 'Retrieved all taggings for researcher.'
      })
   })
   .catch(err => {
     console.log(err);
     next();
   })
 }

 const getAnimalTaggings =  (req, res, next) => {
   const animalId = Number(req.params.id);
   db.any('SELECT * FROM taggings WHERE animal_id = $1', [animalId]
   )
   .then((taggings) => {
     res.status(200)
     .json({
       status: 'Success',
       data: taggings,
       message: 'Retrieved all taggings for animal.'
      })
   })
   .catch(err => {
     console.log(err);
     next();
   })
 }

module.exports = {
  getAllTaggings, getSingleTagging, addTagging, getResearcherTaggings, getAnimalTaggings }
