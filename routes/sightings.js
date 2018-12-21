let express = require('express');
let router = express.Router();
const { getAllSightings, getSingleSighting, addSighting } = require('../database/queries/sightings');


router.get('/', getAllSightings)
router.get('/:id', getSingleSighting);

router.post('/', addSighting);
// //
// router.patch('/:id', updateResearcher);
// //
// router.delete('/:id', deleteResearcher)









module.exports = router;
