import {notification} from './notification_display.js'
let login_btn=document.querySelector('.login_btn');
let reset_password_btn=document.querySelector('.reset_password_btn');
let sign_up_btn=document.querySelector('.sign_up_btn');
let lost_login_link_btn=document.querySelector('.lost_login_link_btn')
let notify=document.querySelector('.notify');
if(reset_password_btn){
  reset_password_btn.addEventListener('click',()=>{
    window.open('/forgotPassword',"_self")
  })
}
if(sign_up_btn){
  sign_up_btn.addEventListener('click',()=>{
    window.open('/signUp',"_self")
  })
}

if(lost_login_link_btn){
  lost_login_link_btn.addEventListener('click',()=>{
    window.open('/lostSignUpCode',"_self")
  })
}

const login=async(obj)=>{
  let res
  try{
    res=await axios({
      method:'POST',
      url:'/api/v1/user/login',
      data:obj
    })
    if(res.data.status=='success'){
      
      notification('You are logged in') 
      setTimeout(function(){window.open('/home',"_self")},3000)
    }

  }
  catch(err){
    notify.classList.add('error')
    notification(err.response.data.message)
  }
}

login_btn.addEventListener('click',async(e)=>{
  e.preventDefault();
  let email=document.getElementById('email').value
  let password=document.getElementById('password').value
  let login_obj={}
  login_obj.email=email;
  login_obj.password=password;
  await login(login_obj)
})

