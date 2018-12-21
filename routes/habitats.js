let express = require('express');
let router = express.Router();
const { getAllHabitats, getSingleHabitat, addHabitat } = require('../database/queries/habitats');


router.get('/', getAllHabitats);
router.get('/:id', getSingleHabitat);

router.post('/', addHabitat);
//


module.exports = router;
