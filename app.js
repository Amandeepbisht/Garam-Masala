const express=require('express');
const app=express();
const viewRouter=require('./routes/viewRoutes');
const path=require('path');
const compression=require('compression');
app.use(compression())
app.use('/',viewRouter)
app.use(express.static(path.join(__dirname,'dev-data')))
app.set('view engine','pug');
app.set('views','./views');





module.exports=app;