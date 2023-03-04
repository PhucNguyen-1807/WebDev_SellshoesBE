const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Router = require("./src/api/routes/index");
require("dotenv").config();
const { connectDb } = require("./src/api/config/db.config");

const app = express()
const port = 3000

app.use(methodOverride('_method')) 
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 

connectDb();

app.use('/api', Router);
app.get('/', (req, res) => {
  res.json({
    message: "Hello World"
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})