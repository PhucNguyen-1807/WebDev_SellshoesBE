require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./src/api/configs/dbConfigs');
const createError = require('http-errors');
const app = express();
const api = require('./src/api/routes/index')
const PORT = 3000;
connectDatabase();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method')) 

app.use('/v1', api);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
