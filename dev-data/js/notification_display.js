let notify=document.querySelector('.notify');

const notification=(str)=>{
  let arr=window.location.href.split('/');
  let page=arr[arr.length-1];
  if(notify.classList[1]=='error'){
    notify.style.color='red';
  }
  notify.textContent=str;
  if(page!='signUp'&&page!='login'&&page!='forgotPassword'){
    
    return setTimeout(function(){
      location.reload();
    },2000)
  }
  else{
    return setTimeout(function(){
      notify.textContent='';
      notify.style.color='orange';
      notify.classList.remove('error');
    },2000)
  }
}

export {notification};