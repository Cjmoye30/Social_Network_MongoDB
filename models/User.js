// importing mongoose
const { Schema, model } = require('mongoose');
const validator = require('validator');
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

});


const User = model('user', userSchema);
const handleError = (err) => console.error(err);

// testing to make sure it works
// create a new user to test it out and see if that populates in our DB
User
    .create({
        username: "Cjmoye30",
        email: "Cjmoye30@gmail.com"
    })
    .then(result => console.log('Created new document', result))
    .catch(err => handleError(err));

module.exports = User;