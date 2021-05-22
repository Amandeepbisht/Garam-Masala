let notify=document.querySelector('.notify');

const notification=(str)=>{
  let arr=window.location.href.split('/');
  let page=arr[arr.length-1];
  notify.textContent=str;
  if(notify.classList[1]=='error'){
    notify.style.color='red';
  }

  if (page=='login'){
    console.log('This is the log from line#17 of notification.js')
    return setTimeout(function(){
      notify.textContent='';
      notify.style.color='orange';
      notify.classList.remove('error');
    },1000)
  }
  else if(page!='signUp'&&page!='login'&&page!='forgotPassword'){
    console.log('This is the log from line#11 of notification.js')
    return setTimeout(function(){
      location.reload();
    },1000)
  }
}

export {notification};