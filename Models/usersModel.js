const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
            return el === this.password;
            }
        },
    } 
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;