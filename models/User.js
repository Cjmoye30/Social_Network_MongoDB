// importing mongoose
const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

// creating the userSchema
const userSchema = new Schema({

    // adding in the columns/documents
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },

    email: {
        type: String,
        unique: true,
        required: true,

        // reference: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        // importing validator.js and passing in the option 'isEmail' which then checks if what is input is indeed an email address
        validate: [isEmail, 'invalid email']
    },

    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],

    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],

},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Virtual called friendCount which gets the length of the user's frineds array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// virtual to count the number of thoughts the user has
userSchema.virtual('thoughtCount').get(function () {
    return this.thoughts.length;
});

const User = model('user', userSchema);

module.exports = User;