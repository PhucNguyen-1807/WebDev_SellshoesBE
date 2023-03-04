const newsRouter=require('./news')
const siteRouter=require('./site')
const coursesRouter=require('./shoes')
const meRouter=require('./me')
const {uploadRouter} = require('./upload');
function route(app){
    // app.use('/news',newsRouter)
    app.use('/shoes',coursesRouter)
    app.use('/me',meRouter)
    app.use('/',siteRouter)
    app.use('/uploads', uploadRouter);
    
}

module.exports  = route;
