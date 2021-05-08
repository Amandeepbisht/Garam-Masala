let back_to_login_btn=document.querySelector('.back_to_login_btn');
let send_link_btn=document.querySelector('.send_link_btn')
let email=document.getElementById('email')
back_to_login_btn.addEventListener('click',(e)=>{
  window.open('/login',"_self")
})

send_link_btn.addEventListener('click',async(e)=>{
  let obj={email:email.value}
  await sendLoginCode(obj)
  window.open('/verify-email-id',"_self")
})

let sendLoginCode=async(obj)=>{
  try{
    let res;
    res=await axios({
      method:'POST',
      url:'/api/v1/user/lostSignUpCode',
      data:obj
    })
  }
  catch(err){
    console.log(err.response.data)
  }
}