const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a user name.'],
        trim: true
    },

    email:{
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
        lowercase: true
    },

    password:{
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: 8
    },

    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password.'],
        validate:{
            validator: 
            function (el) {
            return el === this.password; //expectation
            }
        },
    } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;