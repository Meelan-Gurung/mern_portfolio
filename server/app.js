const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path : './.env'});

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Hello from the server side.`);
});
// app.get("/about", (req, res) => {
//   res.send(`About page`);
// });
// app.get("/contact", (req, res) => {
//   res.send(`Contact Page`);
// });
// app.get("/signin", (req, res) => {
//   res.send(`Signin Page`);
// });
// app.get("/signup", (req, res) => {
//   res.send(`Signup Page`);
// });

app.listen(PORT, () =>{
  console.log(`server running at port ${PORT}`);
});

