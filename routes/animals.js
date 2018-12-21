let express = require('express');
let router = express.Router();
const { getAllAnimals, getSingleAnimal, addAnimal, updateAnimal, deleteAnimal } = require('../database/queries/animals');


router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);

router.post('/', addAnimal);

router.patch('/:id', updateAnimal);

router.delete('/:id', deleteAnimal)















module.exports = router;
