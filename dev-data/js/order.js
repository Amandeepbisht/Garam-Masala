let order_container=document.querySelector('.order_container');
let order=document.querySelector('.order')
let close=document.querySelector('.close');
let menu_row=document.querySelector('.menu_row')
let plus=document.querySelector('.fa-plus-circle')
let minus=document.querySelector('.fa-minus-circle')
let qty=document.querySelector('.qty')
let cart_btn=document.querySelector('.cart_btn')
let instructions=document.getElementById('instructions')
let num_of_chars=document.querySelector('.num_of_chars')
let delete_item=document.querySelector('.delete_item')
let check_out_btn=document.querySelector('.check_out_btn')
let mobile_cart_row=document.querySelector('.mobile_cart_row')
let price

const create_box=(header,description,price)=>{
  document.querySelector('.order_name').innerHTML=header
  document.querySelector('.order_description').innerHTML=description
  cart_btn.innerHTML=`add to cart - ${price}`
}

function setPrice(){
  let total_price=(qty.value*(price.substring(1)*1)).toFixed(2)
  cart_btn.innerHTML=`add to cart - $${total_price}`
}

function checkCharacters(){
  let chars_left=200-instructions.value.length
  if(chars_left<=0){
    num_of_chars.disabled=true;
    num_of_chars.style.color='tomato';
    num_of_chars.innerHTML=`Limit 0f 200 characters has been exceeded!`
  }
  else{
    num_of_chars.innerHTML=`${chars_left} characters left`
    num_of_chars.style.color='black';
  }
}

// DELETING ITEM from local storage and removing it from display
// 1)REMOVE ITEM FROM THE LOCAL STORAGE
// 2)RELOAD THE PAGE
const refresh_local_storage=(event)=>{
  //  variable "index" is the index of selected item in the local storage array 
  let index=event.target.parentNode.parentNode.className.split(' ')[2].split('_')[3]
  let arr=(localStorage.getItem("order_array"));
  arr=JSON.parse(arr)
  arr.splice(index,1)
  localStorage.setItem("order_array",JSON.stringify(arr))
  location.reload();
}

// the following function updates the local storage when the same order is selected twice
const update_local_storage=(arr,item)=>{
  let index=arr.findIndex(element=>element.name==item.name);
  let item_new_quantity=(item.quantity*1)
  arr[index].quantity=item_new_quantity
  arr[index].item_price=item.item_price.toFixed(2)
  arr[index].spicy=item.spicy
  arr[index].order_instructions=item.order_instructions
  arr[index].if_sold_out=item.if_sold_out
  localStorage.setItem("order_array",JSON.stringify(arr))
  let order_div=document.querySelector('.mobile_content').childNodes[3+index]
  order_div.childNodes[0].innerHTML=`${item_new_quantity}x`
  order_div.childNodes[1].innerHTML=`${arr[index].name}<br>
  <span style="font-weight:550">Spicy</span>: ${arr[index].spicy}<br><span style="font-weight:550">Instructions: </span>${arr[index].order_instructions}`;
  order_div.childNodes[2].innerHTML=`$${arr[index].item_price}<br><i class="far fa-trash-alt delete_item"></i>&nbsp;<i class="fas fa-edit edit_item"></i>`
}

// update the cart icon
const update_cart=()=>{
  let arr=JSON.parse(localStorage.getItem("order_array"))
  let num_of_items=0
  if(arr&&arr.length>0){
    arr.forEach(el => {
      num_of_items+=(el.quantity*1);
    });
  }
  document.querySelector('.cart_items').innerHTML=`<i class="fas fa-shopping-cart"></i>  &emsp; ${num_of_items}`
  document.querySelector('.cart_items_mobile').innerHTML=`<i class="fas fa-shopping-cart"></i>  &emsp; ${num_of_items}`
}

const update_check_out_btn=(array,change)=>{
  let total=0;
  let check_out_btn=document.querySelector('.check_out_btn');
  if(change=='edit'){
    array.forEach(el=>{
      total+=(el.item_price*1);
    })
  }
  else if(change=='new'&&price!=undefined){
    total=(check_out_btn.innerHTML.split(' ')[4].substring(1)*1)+((array[array.length-1].item_price)*1);
  }
  check_out_btn.innerHTML=`Check Out &emsp; &emsp; $${total.toFixed(2)}`
}

// following function adds new order and updates the check out price
// it accepts element of parsed array (local storage)
const order_div=(el)=>{
  let check_out=document.querySelector('.check_out')
  //let order=document.querySelector('.order')
  let mobile_content=document.querySelector('.mobile_content')
  //NEW ELEMENTS
  let div=document.createElement('div');
  let check_out_item_name=document.createElement('p');
  let item_qty=document.createElement('p');
  let check_out_item_price=document.createElement('p');
  
  //ADDING HTML TO NEW ELEMENTS 
  div.classList.add('row')
  div.classList.add('justify-content-center')
  div.classList.add(`check_out_item_${mobile_content.children.length-3}`)
  check_out_item_name.classList.add('check_out_item_name')
  item_qty.classList.add('item_qty')
  check_out_item_price.classList.add('check_out_item_price')
  check_out_item_name.innerHTML=`${el.name}<br>
                                <span style="font-weight:550">Spicy</span>: ${el.spicy}<br>
                                <span style="font-weight:550">Instructions:</span>${el.order_instructions}`;
  
  item_qty.innerHTML=`${el.quantity}x`
  check_out_item_price.innerHTML=`$${((el.item_price)*1).toFixed(2)}<br><i class="far fa-trash-alt delete_item"></i>&nbsp;<i class="fas fa-edit edit_item"></i>`
  
  // updating check out button
  if(check_out.childElementCount==0){
    let check_out_btn=document.createElement('button');
    check_out_btn.classList.add('check_out_btn')
    check_out_btn.innerHTML=`Check Out &emsp; &emsp; $${(el.item_price*1).toFixed(2)}`
    check_out.appendChild(check_out_btn)
  }
  
  else if(check_out.childElementCount==1){
    let arr=JSON.parse(localStorage.getItem("order_array"));
    if(price!=undefined){
      update_check_out_btn(arr,'new');
    }
    else if(price==undefined){
      
      let check_out_btn=document.querySelector('.check_out_btn');
      let current_total=((check_out_btn.innerHTML.split(' ')[4]).substring(1))*1;
      current_total+=(el.item_price*1);
      check_out_btn.innerHTML=`Check Out &emsp; &emsp; $${current_total.toFixed(2)}`
    }
  }
  
  // GENERATING MAIN DIV
  div.appendChild(item_qty);
  div.appendChild(check_out_item_name);
  div.appendChild(check_out_item_price);
  
  mobile_content.appendChild(div)
}

const mobile_menu_load=()=>{
  //let order=document.querySelector('.order')
  order.style.display='block';
  order.style.position='relative'
  order.style.zIndex=1
  order.style.height='100vh';
  document.querySelector('.menu_container').style.display='none';
}

menu_row.onclick=function(event){
  if(event.target.className=='menu_box'||event.target.parentNode.className=='menu_box'){
    order_container.style.display="block";
  }
  if(event.target.parentNode.className=='menu_box'){
    create_box(event.target.parentNode.children[0].innerHTML,
                event.target.parentNode.children[2].innerHTML,
                event.target.parentNode.children[1].innerHTML)
    price=(event.target.parentNode.children[1].innerHTML)  
    
    if(screen.width<800){
      mobile_cart_row.style.display='none';
    }       
  }
  if(event.target.className=='menu_box'){
    create_box(event.target.children[0].innerHTML,
                event.target.children[2].innerHTML,
                event.target.children[1].innerHTML)
    price=event.target.children[1].innerHTML
    if(screen.width<800){
      mobile_cart_row.style.display='none';
    }
  }
}

close.onclick=function(){
  let edit_order=document.querySelector('.edit_order')
  order_container.style.display="none";
     qty.value=1;
  instructions.value='';
  num_of_chars.innerHTML=`200 characters left`
  spicy_options.value='Mild';
  sold_out_options.selectedIndex='0';
  if(screen.width<800){
    mobile_cart_row.style.display='block';
  }
  if(edit_order!=undefined){
    order_container.classList.remove('edit_order')
  }
}

plus.onclick=function(){
  // when clicked on the "menu_box" price is always what appears on menu
  let quantity=(qty.value*1)+1
  let new_price=(price.substring(1)*1)*quantity;
  qty.value=quantity.toString();
  cart_btn.innerHTML=`add to cart - $${new_price.toFixed(2)}`
  
}

minus.onclick=function(){
  let val=qty.value*1
  val-=1;
  if(val>0){
    qty.value=val;
  }
  cart_btn.innerHTML=`add to cart - $${((price.substring(1)*1)*qty.value).toFixed(2)}`
}

qty.oninput=function(){setPrice()};

instructions.oninput=function(){checkCharacters()};

document.querySelector('.order').addEventListener('click',(event)=>{
  if(event.target.classList[2]=='delete_item'&&screen.width>800){
    refresh_local_storage(event)
    //location.reload()
  }

  if(event.target.classList[2]=='delete_item'&&screen.width<=800){

    //let order=document.querySelector('.order')
    let mobile_content=document.querySelector('.mobile_content')
    let close_mobile_content=document.querySelector('.close_mobile_content')
    let div=document.createElement('div')
    div.id='mobile_loader'
    order.insertBefore(div,order.childNodes[0])
    mobile_content.style.display='none'
    close_mobile_content.style.display='none'
    setTimeout(()=>{
      let mobile_loader=document.getElementById('mobile_loader')
      mobile_loader.parentNode.removeChild(mobile_loader)
      mobile_content.style.display='block'
      close_mobile_content.style.display='block'
    },1200)
    refresh_local_storage(event);
    let check_out_btn=document.querySelector('.check_out_btn')
    let obj=document.querySelector('.mobile_content')
    let arr=([...obj.children])
    arr.forEach(el=>{
      if(el.children.length==3){
        el.parentNode.removeChild(el)
      }
    })
    check_out_btn.parentNode.removeChild(check_out_btn)
    update_order()
    update_cart()
  }

  if(event.target.classList[2]=='edit_item'){
    
    let arr=JSON.parse(localStorage.getItem("order_array"))
    // item_index is the endex if the selected item in the local storage array
    let item_index=(event.target.parentNode.parentNode.classList[2].split('_')[3])*1
    let item_obj=(arr[item_index])
    let header=item_obj.name
    let description=item_obj.order_description
    price=`$${((item_obj.item_price)*1).toFixed(2)}`
    order_container.style.display="block";
    order_container.classList.add('edit_order')
    create_box(header,description,price)
    document.querySelector('.qty').value=item_obj.quantity;
    document.getElementById('spicy_options').value=item_obj.spicy;
    document.getElementById('sold_out_options').selectedIndex=`${item_obj.if_sold_out.split('-')[1]}`;
    document.getElementById('instructions').value=item_obj.order_instructions;
    price=`$${(item_obj.item_price)/(item_obj.quantity*1)}`
  }
})

cart_btn.onclick=function(){
  //QUERY SELECTORS
  let order_name=document.querySelector('.order_name')
  let spicy_options=document.getElementById('spicy_options')
  let sold_out_options=document.getElementById('sold_out_options')
  let qty=document.querySelector('.qty')
  let order_description=document.querySelector('.order_description')
  let order_instructions=document.getElementById('instructions')
  var check_out_items=[]
  var item={
    name:order_name.innerHTML,
    quantity:qty.value,
    spicy:spicy_options.value,
    if_sold_out:sold_out_options.value,
    item_price:(qty.value*(price.substring(1)*1)),
    order_description:order_description.textContent,
    order_instructions:order_instructions.value
  }

  if((item.quantity*1<1)){
    alert('Please enter a quantity greater than 0 !')
  }
  else{
    check_out_items.push(item)
    let arr=localStorage.getItem("order_array");
    if(arr){
      let parsed_arr=JSON.parse(arr)
      let edit_order=document.querySelector('.edit_order')
      // "found" is the item which is already in the local storage array
      let found=parsed_arr.find(el=>el.name==item.name&&el.spicy==item.spicy&&el.order_instructions==item.order_instructions)
      if(found!=undefined&&edit_order==undefined){
        update_local_storage(parsed_arr,item);
        update_check_out_btn(parsed_arr,'edit')
      }
      else if(edit_order!=undefined){
        edit_order.classList.remove('edit_order');
        update_local_storage(parsed_arr,item);
        update_check_out_btn(parsed_arr,'edit');
      }
      else{
        parsed_arr.push(item)
        localStorage.setItem('order_array',JSON.stringify(parsed_arr))
        order_div(parsed_arr[parsed_arr.length-1])
        //update_check_out_btn(parsed_arr,'new')
      }
    }
    else if(arr==null){
      localStorage.setItem('order_array',JSON.stringify(check_out_items))
      order_div(check_out_items[0])
    }
    order_container.style.display="none";
    qty.value=1;
    instructions.value='';
    num_of_chars.innerHTML=`200 characters left`
    spicy_options.value='Mild';
    sold_out_options.selectedIndex='0';
    update_cart()
    if(screen.width<800){
      mobile_cart_row.style.display='block';
    }

  }

  
}

let close_mobile_content=document.querySelector('.close_mobile_content');
close_mobile_content.onclick=function(){
  order.style.display='none'
  document.querySelector('.menu_container').style.display='block';
}

let cart_items_mobile=document.querySelector('.cart_items_mobile')
cart_items_mobile.onclick=function(){
  mobile_menu_load();
}

let home_button=document.querySelectorAll('.home_button');
home_button[1].onclick=function(){
  window.open('/home',"_self")
}
home_button[0].onclick=function(){
  window.open('/home',"_self")
}

/****following code runs when the page loads********/
const generate_order=(arr)=>{
  arr.map(item=>{
    order_div(item);
  })
}
const myFunction=()=>{
  setTimeout(showPage,1000)
}
const showPage=()=>{
  document.getElementById('content').style.display='block';
  document.getElementById('loader').style.display='none';
}

let pickup=document.getElementById('pickup')
let delivery=document.getElementById('delivery')
let type_of_order=document.querySelector('.type_of_order')

const update_order=()=>{
  let arr=JSON.parse(localStorage.getItem("order_array"));
  if(arr&&arr.length>0){
    generate_order(arr)
  }
}

update_order();
update_cart()
if(pickup.checked==true){
  type_of_order.innerHTML='You will need to go to Garam Masala to pick up this order.'
}
else if(delivery.checked==true){
  type_of_order.innerHTML='This order will delivered at the address provided by you.'
}

delivery.onclick=function(){
  type_of_order.innerHTML='This order will delivered at the address provided by you.'
}

pickup.onclick=function(){
  type_of_order.innerHTML='You will need to go to Garam Masala to pick up this order.'
}

/***********************DELIVERY BOX FUNCTIONALITY*************************/
document.querySelector('.about_order').addEventListener('click',(e)=>{
  
  if(e.target.className=='edit_address'){
    document.querySelector('.mapboxgl-ctrl-geocoder').style.display='block'
    let marker=document.querySelector('.marker')
    if(marker){
      marker.parentElement.removeChild(marker)
    }
    
    (localStorage.getItem('delivery_address'))
  }
})

