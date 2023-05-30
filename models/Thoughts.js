// importing mongoose
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

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

    // reactions - array of nested documents created with the reaction schema
    // this will be an embedded document - meaning that we are storing all of the data rather than just a reference of the reactionID
    reactions: [reactionSchema]

}

);

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;