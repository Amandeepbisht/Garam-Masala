let login_btn=document.querySelector('.login_btn');
let reset_password_btn=document.querySelector('.reset_password_btn');
let back_to_login_btn=document.querySelector('.back_to_login_btn');
let sign_up_btn=document.querySelector('.sign_up_btn');
let lost_login_link_btn=document.querySelector('.lost_login_link_btn')

if(reset_password_btn){
  reset_password_btn.addEventListener('click',()=>{
    window.open('/forgotPassword',"_self")
  })
}

if(back_to_login_btn){
  back_to_login_btn.addEventListener('click',()=>{
    window.open('/login',"_self")
  })
}

if(sign_up_btn){
  sign_up_btn.addEventListener('click',()=>{
    window.open('/signUp',"_self")
  })
}
if(lost_login_link_btn){
  lost_login_link_btn.addEventListener('click',()=>{
    window.open('/lostLoginLink',"_self")
  })
}

// let drop_down=document.querySelector('.dropdown-menu')
// drop_down.addEventListener('click',e=>{
//   if(e.target.tagName=='A'&&e.target.id!="logout"){
//     console.log(e.target.id)
//     window.open(`/${e.target.id}`,"_self")
//   }
// })