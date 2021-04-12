const url=require('url');
const http=require('http');
const slugify=require('slugify');
const app=require('./app')
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'})

const port=process.env.port||8000;

app.listen(port,()=>{
  console.log('Listening to requests on port 8000!')
})
process.on('unhandeledRejection',err=>{
  console.log(err.name,err.message)
  console.log('UNHANDELED REJECTION!...SHUTTING DOWN')
  server.close(()=>{
    process.exit(1);
  })
})