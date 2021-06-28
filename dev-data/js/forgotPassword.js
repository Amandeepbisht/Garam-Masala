import {notification} from './notification_display.js'
let notify=document.querySelector('.notify')
let back_to_login_btn=document.querySelector('.back_to_login_btn');
let send_link_btn=document.querySelector('.send_link_btn')
back_to_login_btn.addEventListener('click',()=>{
  window.open('/login',"_self")
})

let send_login_link=async(obj)=>{
  let res
  try{
    res=await axios({
      method:'POST',
      url:'/api/v1/user/forgotPassword',
      data:obj
    })
    if(res.data.status=='success'){
      send_link_btn.disabled=true;
      return 'A link to reset password has been sent to your email-id.'
    }
  }
  catch(err){
    
    notify.classList.add('error')
    return err.response.data.message
  }
}

send_link_btn.addEventListener('click',async(e)=>{
  let email=document.getElementById('email').value;
  let obj={
    email:email
  }
  let msg=await send_login_link(obj);
  notification(msg)
  if(msg.startsWith('A link')){
    setTimeout(function(){
      location.reload()
    },3000)
  }
})