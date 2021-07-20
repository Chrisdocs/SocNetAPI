const router = require('express').Router();

// grab all user contollers
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// set up GET ALL routes at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// set up GET ONE, PUT and DELETE at /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// set up POST and DELETE routes for adding and removing friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;