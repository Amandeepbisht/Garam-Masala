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
const mongoSantize=require('express-mongo-sanitize')
const helmet=require('helmet')
const csp=require('express-csp')
//app.use(compression())
app.use(express.json({limit:'10kb'}))
app.use(express.static(path.join(__dirname,'dev-data')))
app.use(cookieParser())
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
  );
  if (req.method === "OPTIONS") {
  return res.status(200).end();
  }
  next();
});
app.use(xss())
app.use(mongoSantize());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    },
  })
);
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
})

app.set('view engine','pug');
app.set('views','./views');
app.set('trust proxy',1)
console.log("This is the log from line#44 of app.js")

app.use('/api/v1/user',userRouter)
app.use('/',viewRouter)
app.use(globalErrorHandler)
module.exports=app;