import {notification} from './notification_display.js'
let save_btn=document.querySelector('.save_btn');
let password=document.getElementById('new_password');
let confirmPassword=document.getElementById('confirm_password');
let back_to_login_btn=document.querySelector('.back_to_login_btn');
let notify=document.querySelector('.notify')
back_to_login_btn.addEventListener('click',e=>{
  window.open('/login',"_self")
})

save_btn.addEventListener('click',async(e)=>{
  let resetObj={}
  resetObj.token=save_btn.value;
  resetObj.password=password.value;
  resetObj.confirmPassword=confirmPassword.value;
  let msg=await resetPassword(resetObj)
  notification(msg)
  if(msg.startsWith('Your password')){
    setTimeout(function(){window.open('/home','_self')},3000)
  }
})

const resetPassword=async(obj)=>{
  try{
    let res
    res=await axios({
      method:'PATCH',
      url:`/api/v1/user/resetPassword/${obj.token}`,
      data:obj
    })
    if (res.data.status=='success'){
      return("Your password have been reset successfully.")
    }
  }
  catch(err){
    notify.classList.add('error')
    return (err.response.data.message)
  }
}