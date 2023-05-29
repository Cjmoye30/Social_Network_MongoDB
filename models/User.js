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

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',   
        }
    ]

});


const User = model('user', userSchema);
const handleError = (err) => console.error(err);

// testing to make sure it works
// create a new user to test it out and see if that populates in our DB
// comment out when working correct

module.exports = User;