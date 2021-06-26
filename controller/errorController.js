const { JsonWebTokenError } = require("jsonwebtoken")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// control depending upon weather the error is in production or development 
const handleCastError=(err)=>{
  return new AppError(`invalid ${err.path}:${err.value}`,400)
}

const handleValidationError=(err)=>{
  let obj=err.errors;
  let error_arr=(Object.values(obj));
  let err_str= 'Invalid input data: '
  error_arr.forEach(el=>{
    err_str+=el.message;
    err_str+=' '
    })
  return new AppError(err_str,400)
}

const handleDuplicateKeyError=(err)=>{
  const msg=err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
  return new AppError(`${msg} already exists`,400)
  
}

const handleJWTError=()=>{
  return new AppError('Invalid token',401)
}

const sendErrorDev=(err,req,res)=>{
  // for API
  if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
      name:err.name,
      status:err.status,
      err:err,
      stack:err.stack,
      message:err.message
    })
  }
  // For rendered website
  return res.status(err.statusCode).render('error',{
    title:'Something went wrong',
    message:err.message

  })
}

const sendErrorProd=(err,req,res)=>{
  // FOR API
  if(req.originalUrl.startsWith('/api')){
    if(err.isOperational){
      return res.status(err.statusCode).json({
        status:err.status,
        err:err,
        stack:err.stack,
        message:err.message
  
      })
    }
    return res.status(err.statusCode).render('error',{
      title:'Something went wrong',
      message:err.message
    })
  }
  // FOR RENDERED WEBSITE
  if (err.isOperational){
    return res.status(err.statusCode).render('error',{
      title:'Something went wrong',
      message:err.message
    })
  }
  res.status(err.statusCode).render('error',{
    title:'Something went wrong',
    message:'Please try again later'
  })
}


module.exports=(err,req,res,next)=>{
  err.statusCode=err.statusCode||500;
  err.status=err.status||'error';
  

  if(process.env.NODE_env=='production'){
    if(err.name=='JsonWebTokenError'){err=handleJWTError()}
    if(err.name=='CastError'){err=handleCastError(err)}
    if(err.name=='ValidationError'){err=handleValidationError(err)}
    if(err.code==11000){err=handleDuplicateKeyError(err)}
    sendErrorProd(err,req,res)
  }
  else if(process.env.NODE_env=='development'){
   sendErrorDev(err,req,res)
  }
}

