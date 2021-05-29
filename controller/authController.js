const {promisify}=require('util')
const catchAsync = require("./../utils/catchAsync");
const AppError=require('./../utils/appError')
const User=require('./../models/user_model')
const jwt=require('jsonwebtoken')
const Email=require('./../utils/email')
const crypto=require('crypto');


const signToken=(id)=>{
  let token=jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:'90d'})
  return token
}
const createSendToken=(user,statusCode,req,res)=>{
  let token=signToken(user._id)
  let cookieOptions={
    expires:new Date(Date.now()+90*24*60*60*1000),
    httpOnly:true
    }
  user.password=undefined
  res.cookie('jwt',token,cookieOptions)
  res.status(statusCode).json({
    status:'success',
    data:{
      user
    },
    token:token
  })
}



exports.protect =catchAsync(async(req,res,next)=>{
  let token
  if( req.headers.authorization&&
      req.headers.authorization.startsWith('Bearer')
    )
    {
      token=req.headers.authorization.split(' ')[1]
    }
  else if(req.cookies.jwt){
    token=req.cookies.jwt
  }
  
  if(!token){
    return next(new AppError('You are not logged in. Please log in again.',401))
  }
  
  let decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
  
  // 1) check if the user still exists
  let freshUser=await User.findById(decoded.id)
  if(!freshUser){
    return next(new AppError('User no more exists',401))
  }
  
  if( freshUser.passwordChangedAfter(decoded.iat)==false){
    return next (new AppError('Password have been changed recently. Please log in again',401))
  }
  req.user=freshUser;
  res.locals.user=freshUser;
  next()
})

//for rendered paged
exports.isLoggedIn=async(req,res,next)=>{
  if(req.cookies.jwt!=undefined){
    try{
      // 1) verify token
      let token=req.cookies.jwt;
      let decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
      let currentUser=await User.findById(decoded.id)
      // 2) check if the user still exists
      if(!currentUser){
        return next();
      } 
      // 3) check if the user changed the password after the token was issued
      if(currentUser.passwordChangedAfter(decoded.iat)==false){
        return next();
      }
      if(currentUser.active==true){
        req.user=currentUser
        res.locals.user=currentUser
      }

      next();
    }
    catch(err){
      console.log(err)
      next()
    }
  }
  next()
  
}

exports.login=catchAsync(async(req,res,next)=>{
  
  //1) check if email and password exist in req.body
  if(!req.body.email||!req.body.password){
    return next(new AppError('Please provide email and password', 400))
  }
  //2) check if user exists in DB and password is correct
  let user= await User.findOne({email:req.body.email}).select('+password')
  
  if(!user){
    return next(new AppError('Incorrect email-id or password',400))
  }
  let correct=await user.comparePassword(req.body.password,user.password)

  if(correct==false){
    return next(new AppError('Incorrect email-id or password',404))
  }
  if(user.active==false){
    return next(new AppError('Please verify you email id',404))
  }
  //3) If everything is okay, send token to the client
  createSendToken(user,200,req,res)
})

exports.signUp=catchAsync(async(req,res,next)=>{
  let signUpObj=(req.body)
  let verification_code=Math.floor(1000 + Math.random() * 9000)
  signUpObj.signUpCode=verification_code;
  let user= await User.create(signUpObj)
  await new Email(user,verification_code).verifyEmailId()
  createSendToken(user,201,req,res)
})

exports.verifyEmailId=catchAsync(async(req,res,next)=>{
 
  // fetching user from the middleware  
  let user=req.user;
  // checking if the entered code resembles with the one in DB
  if(user.signUpCode!=req.body.code){
    return next(new AppError('Incorrect code. Please try again.',401))
  }
  // if entered code maches with what is in DB
  if(req.body.code==user.signUpCode){
    // change active status
    user.active=true;
    // remove signUp code from DB
    user.signUpCode=undefined;
    // save the users
    await user.save()
    createSendToken(user,200,req,res)
  }
})

exports.logOut=catchAsync(async(req,res,next)=>{
  let token='null'
  res.cookie('jwt',token,{
    expires:new Date(Date.now()+(10*1000)),
    httpOnly:true
  })
  res.status(200).json({
    status:'success',
    message:'Your are successfully logged out!'
  })
})

exports.updatePassword=catchAsync(async(req,res,next)=>{
  
  //1) fetch password from user
  let user= await User.findById(req.user._id).select('+password')
  let userPassword=user.password;
  //2) compare password
  let ifCorrect= await user.comparePassword(req.body.currentPassword,userPassword)
  if(ifCorrect==false){
    return next(new AppError('Incorrect Password! Please try again.',401))
  }
  //3) update password
  user.password=req.body.newPassword
  user.confirmPassword=req.body.confirmPassword
  user.passwordChangedAt=Date.now();
  await user.save()
  createSendToken(user,200,req,res)
})

exports.forgotPassword=catchAsync(async(req,res,next)=>{
  
  let email=req.body.email;
  let user=await User.findOne({email:email})
  //1) check of email-id exists in DB
  if(!user){return next(new AppError('Incorrect email-id. Please check again!',401))}
  // 2) Generate reset password reset token
  let token= user.createPasswordResetToken();
  await user.save();
  let url=`http://localhost:8000/api/v1/user/resetPassword/${token}`
  let url_client_side=`${req.protocol}://${req.get('host')}/resetPassword/${token}`
  await new Email(user,url_client_side).sendLoginLink()
  res.status(200).json({
    status:'success',
    message:'A log in link has been sent at you email-id.'
  })
})

exports.resetPassword=catchAsync(async(req,res,next)=>{
  let token=req.params.resetToken
  let hashedToken=crypto.createHash('sha256')
                        .update(token)
                        .digest('hex');
  //1) Find User
  let user=await User.findOne({passwordResetToken:hashedToken})
  if(!user){
    return next(new AppError('The user exists no more',401))
  }
  //2) Check if the token have expired  
  if(user.passwordExpiresAt<Date.now()){
    return next(new AppError('This link have been expired. Please get a new one.',401))
  } 
  //3) Check if password confirms 
  if(req.body.password!=req.body.confirmPassword){
    return next(new AppError('Passwords do not match. Please confirm your password again.',401))
  }
  user.password=req.body.password;
  user.confirmPassword=req.body.confirmPassword;
  user.passwordChangedAt=Date.now();
  user.passwordResetToken=undefined;
  user.passwordExpiresAt=undefined;
  await user.save();
  //4) Log the user in and send the token
  createSendToken(user,200,req,res)
})

exports.lostSignUpCode=catchAsync(async(req,res,next)=>{
  let verification_code
  let email=req.body.email;
  // check if the user exists
  let user=await User.findOne({email:email});
  if(!user){
    return next(new AppError('Sorry there is no user with this Email-Id! Please check again.',401))
  }
  verification_code=user.signUpCode
  if(user.active==true){
    return next(new AppError('Your have been created already. Please use "Forgot Password?" option to login again',401))
  }
  await new Email(user,verification_code).verifyEmailId()
  createSendToken(user,200,req,res)
})