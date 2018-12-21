let express = require('express');
let router = express.Router();
const { getAllTaggings, getSingleTagging, addTagging, getResearcherTaggings, getAnimalTaggings} = require('../database/queries/taggings');


router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', getResearcherTaggings)
router.get('/animals/:id', getAnimalTaggings)

router.post('/', addTagging);


module.exports = router;
