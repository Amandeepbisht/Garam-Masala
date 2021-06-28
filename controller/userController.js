const AppError = require('../utils/appError');
const User=require('./../models/user_model')
const catchAsync=require("./../utils/catchAsync");
exports.getAllUsers=async(req,res)=>{
  try{
    const user=await User.find();
    res.status(200).json({
      status:'success',
      users:user
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.getUserById=catchAsync(async(req,res,next)=>{
  let urlArr=req.originalUrl.split('/')
  
  console.log(urlArr[urlArr.length-1])
  let id=req.params.id
  let user= await User.findById(id)
  //let user= await User.findOne({name:`${urlArr[urlArr.length-1]}`})
  console.log(user)
  res.status(200).json({
    status:'success',
    message:'This is a test route!'
  })
})

exports.updateMe=catchAsync(async(req,res,next)=>{
  let id=req.user.id
  let update={
    name:req.body.name,
    phone:req.body.phone
  }
  const updatedUser=await User.findByIdAndUpdate(id,update,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    status:'success',
    data:updatedUser,
    message:'successfully updated'
  })
})
