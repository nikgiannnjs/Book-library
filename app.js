const express = require('express');
const app = express();
const bookroutes = require('./routes/bookroutes');
const usersroutes = require('./routes/usersroutes');

app.use(express.json()); //Kanei parse ta data gia na diabazei objects

app.use('/bookstore', bookroutes); //ola ta url pou tha einai sto routes prepei na ksekinane me /bookstore
app.use('/bookstore/users', usersroutes);

module.exports= app;