const express=require('express');
const app=express();
const viewRouter=require('./routes/viewRoutes');
const userRouter=require('./routes/userRoutes');
const globalErrorHandler=require('./controller/errorController')
const path=require('path');
const cors = require('cors');
const compression=require('compression');
const cookieParser = require('cookie-parser');

const xss=require('xss-clean');
const mongoSantize=require('express-mongo-santize')
const helmet=require('helmet')

app.use(compression())
app.use(express.json({limit:'10kb'}))
app.use(express.static(path.join(__dirname,'dev-data')))
app.use(cookieParser())
app.use(cors());
app.options('*', cors());

app.use(xss())
app.use(mongoSantize());
app.use(helmet());

app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
})
app.set('view engine','pug');
app.set('views','./views');

app.use('/api/v1/user',userRouter)
app.use('/',viewRouter)
app.use(globalErrorHandler)
module.exports=app;