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
        required: true
    },

        // wouldn't I need to bring in the ID of the user of this thought in order for it to be linked a lot easier? We have decent instructions but I believe we would need this in order for it to be linked up

        // TBD - might not need this after all
    userID: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],

    //   reactions: {
    //     // array of nested documents created with the reactionSchema
    //   }

},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


const Thoughts = model('thought', thoughtSchema);
const handleError = (err) => console.error(err);

module.exports = Thoughts;