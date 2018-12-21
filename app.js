const express = require('express');
const app = express();
const bp = require('body-parser');
app.use(bp.urlencoded({ extended: false}));
app.use(bp.json());

let animals = require('./routes/animals');
let researchers = require('./routes/researchers');
let species = require('./routes/species');
let habitats = require('./routes/habitats');
let taggings = require('./routes/taggings');
let sightings = require('./routes/sightings');



app.use('/animals', animals)
app.use('/researchers', researchers)
app.use('/species', species)
app.use('/habitats', habitats)
app.use('/taggings', taggings)
app.use('/sightings', sightings)











app.get('*', (req, res) => {
  res.status(404).send('Error')
});

app.listen(3000, () => {
  console.log('Yerr on 3000');
});
