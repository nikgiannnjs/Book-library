const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
const app = require ('./app.js');

const port= 3000;

//MongoDB connection

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

