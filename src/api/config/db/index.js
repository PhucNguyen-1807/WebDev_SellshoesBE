const mongoose = require("mongoose");
require('dotenv').config();
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@phuc-15-02-2023.b48httj.mongodb.net/web?retryWrites=true&w=majority`);
        console.log("connect successfuly");
    }
    catch(error){
        console.log("connect failure2");
    }
}
module.exports = { connect };
