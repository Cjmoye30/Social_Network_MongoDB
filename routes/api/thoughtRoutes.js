// This is house all of our routes that we want to define with /users - no matter what type of CRUD
const router = require('express').Router();

// all base routes for users (not anything to do with the api on these)
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(updateThought);

module.exports = router;