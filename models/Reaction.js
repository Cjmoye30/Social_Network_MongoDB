const { Schema, model } = require('mongoose');
const moment = require('moment/moment');

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },

    reactionBody: {
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
        default: Date.now(),
        // use a getter method to format the timestamp
        get: formatDate
    },
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Format date with moment.js
function formatDate(date) {
    return moment(date).format('MMMM Do, YYYY')
}

module.exports = reactionsSchema;