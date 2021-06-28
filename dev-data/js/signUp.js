import {notification} from './notification_display.js'
let back_to_login_btn=document.querySelector('.back_to_login_btn');
let register_btn=document.querySelector('.register_btn');
let notify=document.querySelector('.notify');
back_to_login_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.open('/login',"_self");
  })

const register=async(obj)=>{
  let res
  try{
      res= await axios({
      method:'POST',
      url:'/api/v1/user/signUp',
      data:obj
    })
    if(res.data.status=='success'){
      return 'A signup code have been sent to you email id.'
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

register_btn.addEventListener('click',async e=>{
  e.preventDefault();
  let obj={}
  obj.name=document.getElementById('name').value;
  obj.email=document.getElementById('email').value;
  obj.phone=document.getElementById('phone').value;
  obj.password=document.getElementById('password').value;
  obj.confirmPassword=document.getElementById('confirm_password').value;
  let msg=await register(obj)
  notification(msg)
  if(msg.startsWith('A signup code')){
    setTimeout(function(){window.open('/verify-email-id',"_self")},3000)
  }
})