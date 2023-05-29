const express = require('express');
const db = require('./config/connections');
const validator = require('validator')
// require model
const { User, Thoughts } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/all-thoughts', async (req, res) => {

  try {
    const result = await Thoughts.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
});

// going to put all of my API routes in here to start to make everything simpler for me and I can just look in one place

// once everything is working correctly - then I can move them to the routes folder similar to the folder structure in the mini project

// ----------------- USER ROUTES -----------------
// GET all users - DONE
app.get('/api/users', async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. All users not found." })
  }
});

// GET a single user by its _id and populated thought and friend data - DONE
app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await User.findOne({_id: req.params.id})
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. User ${req.params.id} was not found.`})
  }
});

// POST a new user - DONE
app.post('/api/new-user', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(200).json(newUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong. New user not created." })
  }
});

// PUT to update a user by its _id - DONE
app.post('/api/users/:id', async (req, res) => {

  console.log("ID: ",req.params.id)
  console.log("Request Body: ", req.body)
  try {
    const result = await User.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
      );
      console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. ${req.params.id} was not found.`})
  }
});

// DELETE to remove a user by its _id - DONE
app.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await User.findOneAndRemove({_id: req.params.id})
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. ${req.params.id} was not removed.`})
  }
});


// ----------------- THOUGHT ROUTES -----------------
// GET all thoughts - DONE
app.get('/api/thoughts', async (req, res) => {
  try {
    const result = await Thoughts.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. All thoughts not found." })
  }
});

// GET single thought by _id - DONE
app.get('/api/thoughts/:id', async (req, res) => {
  try {
    const result = await Thoughts.findOne({_id: req.params.id})
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. Thought ${req.params.id} was not found.`})
  }
});

// POST create a new thought - DONE
app.post('/api/new-thought', async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    console.log(newThought);
    res.status(200).json(newThought)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong. New thought not created." })
  }
});
// PUT update a thought by _id
app.post('/api/thoughts/:id', async (req, res) => {

  console.log("ID: ",req.params.id)
  console.log("Request Body: ", req.body)
  try {
    const result = await Thoughts.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
      );
      console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. Thought ${req.params.id} was not found.`})
  }
});

// DELETE thought by _id
app.delete('/api/thoughts/:id', async (req, res) => {
  try {
    const result = await Thoughts.findOneAndRemove({_id: req.params.id})
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: `Something went wrong. Thought ${req.params.id} was not removed.`})
  }
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
