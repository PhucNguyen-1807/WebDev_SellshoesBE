const mongoose = require('mongoose');
require('dotenv').config();
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log('Database connection successful!');
    } catch (error) {
        console.log(`Unable to connect to database. Exiting now...\n${error}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;