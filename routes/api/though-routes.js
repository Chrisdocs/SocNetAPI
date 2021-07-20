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
    .route('/thoughts')
    .get(getAllThoughts)
    .post(createThought)

// set up Get one routes at /api/thoughts/:id
router
    .route('/api/thoughts/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// set up routes for adding and deleting reactions
router
    .route('/api/thoughts/:thoughtid/reactions')
    .post(addReaction)
    .delete(removeReaction)

module.exports = router;
