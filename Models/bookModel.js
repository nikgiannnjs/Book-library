const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },

    author: {
        type: String,
        require: true,
        trim: true
    },

    pages:{
        type: Number,
        required: true
    },

    genres:{
        type: Array
    },

    description:{
        type: String,
        required: true
    },

    rating:{
        type: Number,
        min: 0,
        max:10
    }

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;