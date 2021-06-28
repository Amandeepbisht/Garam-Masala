const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcryptjs')
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please enter your name."],
    maxLength:[14,'Name must not have more than 14 letters.'],
    minLength:[3,'Name must not have less than 3 letters.']
  },
  email:{
    type:String,
    required:[true,"Please enter you email-id."],
    unique:true,
    validate:[validator.isEmail,'Please provide a valid email.']
  },
  phone:{
    type:String,
    required:[true,"Please enter your phone number."],
    validate:{
      validator:function(el){
        return el.length==10;
      },
      message:'Please enter a valid phone number.'
    }
  },
  password:{
    type:String,
    required:[true,"Please enter you password."],
    minLength:[8,'Password must contain atleast 8 characters.'],
    select:false
  },
  confirmPassword:{
    type:String,
    validate:{
      validator:function(el){
        return el==this.password
      },
      message:'Passwords are not the same.'
    }
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  passwordChangedAt:Date,
  passwordResetToken:{type:String},
  passwordExpiresAt:Date,
  signUpCode:Number,
  active:{
    type:Boolean,
    default:false
  }
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();
  this.password=await bcrypt.hash(this.password,12)
  this.confirmPassword=undefined;
  next();
})

userSchema.methods.comparePassword=async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.passwordChangedAfter= function(jwtTimeStamp){
  if(this.passwordChangedAt){
    return jwtTimeStamp>(this.passwordChangedAt.getTime()/1000)
  }
  return true
}

userSchema.methods.createPasswordResetToken= function(){
  const resetToken=crypto.randomBytes(32).toString('hex')
  const hashedToken=crypto.createHash('sha256')
                          .update(resetToken)
                          .digest('hex');
  this.passwordResetToken= hashedToken
  this.passwordExpiresAt=Date.now()+(10*60*1000)   
  return resetToken                     
}

const User=mongoose.model('user',userSchema);

module.exports = User;