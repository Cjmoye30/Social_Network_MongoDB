const { User } = require('../models');
// any aggregate functions here:

// Routes
module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const result = await User.find({});
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: "Something went wrong. All users not found." })
          }
    },

    // GET single user
    async getSingleUser(req, res) {
        try {
            const result = await User.findOne({ _id: req.params.userId })
            res.status(200).json(result);
          } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. User ${req.params.id} was not found.` })
          }
    },

    // CREATE user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            console.log(newUser);
            res.status(200).json(newUser)
          } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong. New user not created." })
          }
    },

    // UPDATE user
    async updateUser(req, res) {
        console.log("ID: ", req.params.id)
        console.log("Request Body: ", req.body)
        try {
          const result = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
          console.log(result)
          res.status(200).json(result);
        } catch (err) {
          console.log(err)
          res.status(500).json({ message: `Something went wrong. ${req.params.id} was not found.` })
        }
    },

    // DELETE user
    async deleteUser(req, res) {
        try {
            const result = await User.findOneAndRemove({ _id: req.params.userId })
            res.status(200).json(result);
          } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. ${req.params.id} was not removed.` })
          }
    },
};