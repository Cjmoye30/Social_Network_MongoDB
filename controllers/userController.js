const { User } = require('../models');

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const result = await User.find({});
      console.log("-----------All Users-----------:", result)
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong. All users not found." })
    }
  },

  // GET single user
  async getSingleUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
      console.log("Single user:", result)
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
      console.log("New user created:",newUser);
      res.status(200).json(newUser)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Something went wrong. New user not created." })
    }
  },

  // UPDATE user
  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      console.log(`${result.username} updated.`, result)
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
      console.log(`${req.params.userId} deleted.`)
      res.status(200).json(result);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `Something went wrong. ${req.params.id} was not removed.` })
    }
  },

  // ---------------------------- FRIEND Routes ---------------------------- 
  // ADD Friend
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendsId } },
        { new: true }
      )
      console.log(`${req.params.friendsId} added as a friend to ${req.params.userId}`)
      res.status(200).json(newFriend)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Something went wrong. Friend not added." })
    }
  },
  // DELETE Friend
  async deleteFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      console.log(`${req.params.friendsId} removed as a friend from ${req.params.userId}`)
      res.status(200).json(result);

    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Something went wrong. Friend not removed." })
    }
  }
};