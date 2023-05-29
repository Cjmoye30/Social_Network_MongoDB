const { Schema, model } = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },

    reachtionBody: {
        type: String,
        required: true,
        maxLength: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp
    },
})