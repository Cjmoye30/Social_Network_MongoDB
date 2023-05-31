const { Thoughts, User } = require('../models');

// any aggregate functions here:

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const result = await Thoughts.find({});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Something went wrong. All thoughts not found." })
        }
    },

    // GET single thought
    async getSingleThought(req, res) {
        try {
            const result = await Thoughts.findOne({ _id: req.params.thoughtId })
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.thoughtId} was not found.` })
        }
    },

    // CREATE thought
    async createThought(req, res) {
        try {
            // creating a new thought based on the request body
            const newThought = await Thoughts.create(req.body);

            // the thought has to be pushed into an array somewhere so that it can be accessed correctly
            const userPush = await User.findOneAndUpdate(
                { _id: req.body.userId },
                // pushing the automatically generated id of the newly created thought into the array of the user which we defined in the body of the request in the line above.
                { $push: { thoughts: newThought._id } },
                { new: true }
            )
            console.log(newThought);
            console.log(userPush);
            res.status(200).json(newThought)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong. New thought not created." })
        }
    },

    // UPDATE thought
    async updateThought(req, res) {

        console.log("ID: ", req.params.thoughtId);
        console.log("Request Body: ", req.body);
        try {
            const result = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            console.log(result)
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.thoughtId} was not found.` })
        }
    },
    // DELETE thought
    async deleteThought(req, res) {
        try {
            const result = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.id} was not removed.` })
        }
    }
};
