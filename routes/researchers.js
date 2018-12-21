let express = require('express');
let router = express.Router();
const { getAllResearchers, getSingleResearcher, addResearcher, updateResearcher, deleteResearcher } = require('../database/queries/researchers');


router.get('/', getAllResearchers);
router.get('/:id', getSingleResearcher);

router.post('/', addResearcher);
//
router.patch('/:id', updateResearcher);
//
router.delete('/:id', deleteResearcher)















module.exports = router;
