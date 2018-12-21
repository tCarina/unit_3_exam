let express = require('express');
let router = express.Router();
const { getAllSpecies, getSingleSpecies, addSpecies } = require('../database/queries/species');


router.get('/', getAllSpecies);
router.get('/:id', getSingleSpecies);

router.post('/', addSpecies);


module.exports = router;
