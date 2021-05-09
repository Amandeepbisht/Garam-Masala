let notify=document.querySelector('.notify');

const notification=(str)=>{
  let arr=window.location.href.split('/')
  let page=arr[arr.length-1]
  notify.textContent=str
  if(notify.classList[1]=='error'){
    notify.style.color='red';
  }
  if(page!='signUp'&&page!='login'&&page!='forgotPassword'){
    setTimeout(function(){
      location.reload();
    },3000)
  }
  else{
    setTimeout(function(){
      notify.textContent='';
      notify.style.color='orange'
      notify.classList.remove('error');
    },1500)
  }
}

export {notification};