import {notification} from './notification_display.js'
let save_btn=document.querySelector('.save_btn')
let back_to_home_btn=document.querySelector('.back_to_home_btn')
let notify=document.querySelector('.notify');
back_to_home_btn.addEventListener('click',e=>{
  window.open('/home','_self')
})


save_btn.addEventListener('click',async(e)=>{
  let obj={}
  let currentPassword=document.getElementById('current_password').value;
  let newPassword=document.getElementById('new_password').value;
  let confirmPassword=document.getElementById('confirm_password').value;
  obj.currentPassword=currentPassword;
  obj.newPassword=newPassword;
  obj.confirmPassword=confirmPassword;
  let str=await updatePassword(obj)
  notification(str)
})

const updatePassword=async(obj)=>{
  try{
    let res
    res=await axios({
      method:'PATCH', 
      url:'/api/v1/user/updatePassword',
      data:obj
    })
    if(res.data.status=='success'){
      return "Your password have been updated successfully."
    }
  }
  catch(err){
    notify.classList.add('error')
    if(err.response.data.message.split(':')[1]!=undefined){
      return err.response.data.message.split(':')[1].split('.')[0]
    }
    return err.response.data.message
  }
}