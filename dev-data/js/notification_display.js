let notify=document.querySelector('.notify');

const notification=(str)=>{
  let arr=window.location.href.split('/');
  let page=arr[arr.length-1];
  notify.textContent=str;
  if(notify.classList[1]=='error'){
    notify.style.color='red';
  }


  if(page!='signUp'&&page!='login'&&page!='forgotPassword'){
    console.log("hello I am here!!!!!!!")
    return setTimeout(function(){
      location.reload();
    },2000)
  }

  else{
    console.log(`page`)
    return setTimeout(function(){
      notify.textContent='';
      notify.style.color='orange';
      notify.classList.remove('error');
      
    },2000)
  }
}

export {notification};