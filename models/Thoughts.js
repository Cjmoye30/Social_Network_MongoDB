// importing mongoose
const { Schema, model } = require('mongoose');

// creating the userSchema
const thoughtSchema = new Schema({

    // adding in the columns/documents
    thoughtText: {
        type: String,
        unique: true,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp
    },

    // username of the user that created the thought
    username: {
        type: String,
        required: true,
    },

}

);

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;