// module.exports=fn=>{
//   return (req,res,next)=>{
//     console.log("This is the log from line#3 of catchAsync.js")
//     fn(req,res,next).catch(err=>next(err))
//   }
// }

module.exports=fn=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(err=>{next(err)})
  }
}