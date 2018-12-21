const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/unit_3_exam');


const getAllResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers').then(researchers => {
    res.status(200)
    .json({
      status: 'Success',
      data: researchers,
      message: "Retrieved all researchers."
    })
  })
  .catch(err => {
    console.log(error)
    next();
  })
}


const getSingleResearcher = (req, res, next) => {
  const researcherId = Number(req.params.id);
  db.one('SELECT * FROM researchers WHERE id = ${id}', {
    id: researcherId
  }).then((researcher) => {
    res.status(200)
    .json({
      status: 'Success',
      data: researcher,
      message: 'Retrieved single researcher.'
    })
  })
  .catch(err => {
    console.log(err);
    next();
  })
}


const addResearcher = (req, res, next) => {
  const researcher = req.body;
  db.none('INSERT INTO researchers(name, job_title) VALUES (${name}, ${job_title})', researcher)
    .then(() => {
      res.status(200)
      .json({
        status: 'Success',
        message: 'New researcher added!'
      })
    })
    .catch(err => {
      console.log(err);
      next();
    })
 }


const updateResearcher = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ")
  db
    .none(
      "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a researcher!"
      });
    })
    .catch(err => {
    console.log(err);
    next();
  })
};
//
const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id = $1', researcherId).
  then(researcher => {
      res.status(200).json({
        status: "success",
        message: "You killed an researcher. :( )",
        result: researcher
      });
    })
    .catch(err => {
    console.log(err);
    next();
  })
};

module.exports = {
  getAllResearchers, getSingleResearcher, addResearcher, updateResearcher, deleteResearcher }
