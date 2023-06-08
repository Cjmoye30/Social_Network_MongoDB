// This is house all of our routes that we want to define with /users - no matter what type of CRUD
const router = require('express').Router();

// all base routes for users (not anything to do with the api on these)
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// -------------------- FRIENDS --------------------
// /api/user/:userId/friends/
router.route('/:userId/friends/:friendsId').post(addFriend).delete(deleteFriend)

module.exports = router;