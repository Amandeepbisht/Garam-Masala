import {notification} from './notification_display.js'
let save_btn=document.querySelector('.save_btn');
let update_password_btn=document.querySelector('.update_password_btn');
let back_to_home_btn=document.querySelector('.back_to_home_btn');
let notify=document.querySelector('.notify')

back_to_home_btn.addEventListener('click',(e)=>{
  window.open('/home',"_self");
})

update_password_btn.addEventListener('click',(e)=>{
  window.open('/updatePassword',"_Self")
})

save_btn.addEventListener('click',async(e)=>{
  let userName=document.getElementById('name').value;
  let userPhone=document.getElementById('phone').value;
  let obj={}
  obj.name=userName;
  obj.phone=userPhone;
  let str=await updateUser(obj)
  notification(str)
})

const updateUser=async(obj)=>{
  try{
    let res
    res=await axios({
      method:'PATCH',
      url:'/api/v1/user/updateMe',
      data:obj
    })
    if(res.data.status=='success'){
      return 'Your changes have been update successfully.'
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