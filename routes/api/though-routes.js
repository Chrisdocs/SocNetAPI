const router = require('express').Router();

// grab all thought controllers
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// set up Get All routes at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// set up Get one routes at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// set up routes for adding and deleting reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;
