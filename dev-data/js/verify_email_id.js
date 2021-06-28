import {notification} from './notification_display.js'
let notify=document.querySelector('.notify')
let register_btn=document.querySelector('.register_btn');

register_btn.addEventListener('click',async(e)=>{
  let code=document.getElementById('sign_up_code').value;
  e.preventDefault();
  let obj={
    code:code
  }
  let msg=await verify_code(obj)
  notification(msg)
  if (msg.startsWith('Your account')){
    setTimeout(function(){window.open('/home',"_self")},2000)
  }
  
})

const verify_code=async(obj)=>{
  let res
  try{
    res= await axios({
      method:'PATCH',
      url:'/api/v1/user/verifyEmailId',
      data:obj
    })
    if(res.data.status=='success'){
      return 'Your account have been created successfully!'
    }
  }
  catch(err){
    notify.classList.add('error')
    return err.response.data.message
  }
}

