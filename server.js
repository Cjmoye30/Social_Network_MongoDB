const express = require('express');
const db = require('./config/connections');
const validator = require('validator')
const routes = require('./routes');
// require model
const { User, Thoughts } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// ----------------- THOUGHT / REACTION ROUTES -----------------
// CREATE a reaction stored in a single thoughts array field
// app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
//   try {
//     // create a new reaction
//     // store the new reaction in the thoughts reactions array field
//     const newReaction = await Thoughts.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $push: { reactions: req.body } },
//       { new: true }
//     );

//     console.log(newReaction);
//     res.status(200).json(newReaction)

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Something went wrong. New reaction not created." })
//   }
// });

// DELETE a reaction by the its ID value
// app.delete('/api/thoughts/:thoughtId/reactions/:reactionsId', async (req, res) => {

//   try {
//     const deleteReaction = await Thoughts.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $pull: { reactions: {_id: req.params.reactionsId} } },
//       { runValidators: true, new: true }
//       );

//     console.log(deleteReaction);
//     res.status(200).json(deleteReaction);

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Something went wrong. New reaction not created." })
//   }
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
