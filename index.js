const mongoose=require('mongoose')
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})
const app=require('./app')

const port=process.env.PORT||8000;
//let DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
let DB=process.env.DATABASE

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then(con=>{
  console.log('DB connection successful!')
})




app.listen(port,()=>{
  console.log('Listening to requests on port 8000!')
  console.log(`This is the ${process.env.NODE_ENV} mode`)
})
process.on('unhandeledRejection',err=>{
  console.log(err.name,err.message)
  console.log('UNHANDELED REJECTION!...SHUTTING DOWN')
  server.close(()=>{
    process.exit(1);
  })
})