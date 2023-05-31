// This is house all of our routes that we want to define with /users - no matter what type of CRUD
const router = require('express').Router();

// all base routes for users (not anything to do with the api on these)
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).post(updateUser);

module.exports = router;