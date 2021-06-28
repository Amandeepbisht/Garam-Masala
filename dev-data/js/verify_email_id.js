let register_btn=document.querySelector('.register_btn');

register_btn.addEventListener('click',async(e)=>{
  let code=document.getElementById('sign_up_code').value;
  e.preventDefault();
  let obj={
    code:code
  }
  await verify_code(obj)
  window.open('/home',"_self")
})

const verify_code=async(obj)=>{
  let res
  try{
    res= await axios({
      method:'PATCH',
      url:'/api/v1/user/verifyEmailId',
      data:obj
    })
    console.log(res)
  }
  catch(err){
    console.log(err.response.data)
  }
}

