const express = require("express");
const app = express();
const bookroutes = require("./routes/bookroutes");
const usersroutes = require("./routes/usersroutes");

app.use(express.json());

app.use("/bookstore", bookroutes);
app.use("/bookstore/users", usersroutes);

module.exports = app;
