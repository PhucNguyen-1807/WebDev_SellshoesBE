const express=require ('express');
const morgan=require('morgan');
const {engine}=require('express-handlebars');
const app=express();
const path=require('path')
const route = require('./api/routes/index.js')
const methodOverride = require('method-override')
const db=require('./api/config/db')
require('dotenv').config();
// app.use(morgan('combined'));
db.connect()
//overwrite method
app.use(methodOverride('_method')) 
//template engine
app.engine('hbs', engine({
    extname:".hbs",
    helpers: {
        sum(a,b) {return a+b}
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'api','resource','views'));
app.use(express.static(path.join(__dirname,'public/css')))

//form-data 
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 

//routes inite
route(app)

app.listen(3000);
console.log(__dirname);
