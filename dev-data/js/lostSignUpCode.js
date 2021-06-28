import {notification} from './notification_display.js'
let back_to_login_btn=document.querySelector('.back_to_login_btn');
let send_link_btn=document.querySelector('.send_link_btn')
let email=document.getElementById('email')
let notify=document.querySelector('.notify')
back_to_login_btn.addEventListener('click',(e)=>{
  window.open('/login',"_self")
})

send_link_btn.addEventListener('click',async(e)=>{
  let obj={email:email.value}
  await sendLoginCode(obj)
  
})

let sendLoginCode=async(obj)=>{
  try{
    let res;
    res=await axios({
      method:'POST',
      url:'/api/v1/user/lostSignUpCode',
      data:obj
    })
    if(res.data.status=='success'){
      notification('Your signUp code has been sent to your email-id.')
      setTimeout(function(){window.open('/verify-email-id',"_self")},3000)
    }
  }
  catch(err){
    notify.classList.add('error')
    notification(err.response.data.message)
    
  }
}