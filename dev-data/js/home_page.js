import {appetizer,veggie,nonVeg,tandoori,bread,biryani,desserts} from './menu.js'

// FOLLOWING FUNCTION HIGHLIGHTS THE ACTIVE PAGE ON HEADER SECTION
const page_highlight=()=>{
  let urlArr=(window.location.href.split('/'))
  let active=(urlArr[urlArr.length-1])
  if(active.length==0){
    active='home';
  }
  document.querySelector(`.page_link_${active}`).classList.add('active_page')
}
if(document.querySelector('.page_link')){page_highlight()}

// FOLLOWING IS FOR THE SLIDER AT HOME PAGE
jQuery(document).ready(function($){
 
  $('.slides').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    infinite:true,
    prevArrow:"<span class='prevArrow'><i class='fas fa-chevron-circle-left fa-2x'></i></span>",
    nextArrow:"<span class='nextArrow'><i class='fas fa-chevron-circle-right fa-2x'></i></span>",
    responsive:[
      {
        breakpoint:980,
        settings:{
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay:true,
          infinite:true,
          arrows:false
        }
      },
      {
        breakpoint:600,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay:true,
          infinite:true,
          arrows:false
        }
      }
    ]
  });
  
  var filtered = false;
  
  $('.js-filter').on('click', function(){
    if (filtered === false) {
      $('.slides').slick('slickFilter',':even');
      $(this).text('Unfilter Slides');
      filtered = true;
    } else {
      $('.slides').slick('slickUnfilter');
      $(this).text('Filter Slides');
      filtered = false;
    }
  });

});
 
let order_btn=document.querySelectorAll('.order_online_btn');
let read_more_btn=document.querySelector('.read_more_btn');
let contact_us_btn=document.querySelector('.contact_us_btn');
let view_complete=document.querySelectorAll('.view_complete')
let visit_btn=document.querySelectorAll('.visit_btn')
if(order_btn){
  order_btn.forEach((item=>{
    item.addEventListener('click',function(){
      window.open('/order',"_self")
    })
  }))
}
if(read_more_btn){
  read_more_btn.addEventListener('click',()=>{
    window.open('/aboutUs',"_self")
  })
}
if(contact_us_btn){
  contact_us_btn.addEventListener('click',()=>{
    window.open('/contactUs',"_Self")
  })
}
if(view_complete){
  view_complete.forEach((item=>{
    item.addEventListener('click',()=>{
      window.open('/contactUs',"_self")
    })
  }))
}
if(visit_btn){
  visit_btn.forEach((item)=>{
    item.addEventListener('click',()=>{
      window.open('/ourMenu',"_self");
    })
  })
}

// FOLLOWING IS FOR THE TEXT AT THE VERY BOTTOM OF EVERY PAGE
let date
date=new Date().getFullYear();
let el=document.querySelector('.allright')
if(el){
  el.innerHTML=`<p>${date} All rights reserved. Website by.............. </p>`
}
//document.querySelector('.allright').innerHTML=`<p>${date} All rights reserved. Website by.............. </p>`

//******************************************************************//
                // FOR ourMenu.pug & order.pug
//******************************************************************//
let urlArr=(window.location.href.split('/'))
let active=(urlArr[urlArr.length-1])
const render_menu=(menu)=>{
  let menu_el=document.querySelector('.menu_row');
  menu_el.innerHTML="";
    menu.forEach(el=>{
    let div=document.createElement('div')
    div.className='col-lg-6 col-md-6 col-sm-12 menu_content'
    if(active=='order'){
      div.innerHTML= `<div class='menu_box'>
                        <p class='item_name_order_page'>${el.name}</p>
                        <span class='item_price_order_page'>${el.price}</span>
                        <p class="item_description_page"> ${el.description}</p>
                      </div>`      
    }
    else{
      div.innerHTML= `<div class='menu_box'>
                      <p class='item_name'>${el.name}</p>
                      <span class='item_price'> ${el.price}</span>
                      <p class="item_description"> ${el.description}</p>
                  </div>`
    }
    menu_el.appendChild(div)
  })
}

if (document.querySelector('.menu_list')){
  render_menu(appetizer);
  document.querySelector('.menu_list').addEventListener('click',(event)=>{
    let menu_items=document.querySelector('.menu_row')
    let removedClass=(menu_items.classList[(menu_items.classList.length)-1])
    let newClass=(event.target.className.split(' ')[0])
    if(newClass.length>0&&event.target.tagName=='IMG'){
      menu_items.classList.remove(removedClass);
      menu_items.classList.add(newClass);
      document.querySelector(`.active`).classList.remove('active')
      document.querySelector(`.${newClass}`).classList.add('active')
      render_menu(eval(newClass))
    }
    
  })
}

//******************************************************************//
                // FOR gallery.pug
//******************************************************************//

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox({
    maxWidth:800
  });
});


// FOLLOWING IS FOR THE MENU BUTTON THAT APPEARS ON SMALLER SCREEN

let menu_btn=document.querySelector('.fa-bars');
if(menu_btn){
  menu_btn.addEventListener('click',(event)=>{
    
    document.getElementById('wrapper').style.display='none';
    document.querySelector('.toggled').style.display='block';
  })
}

let close_btn=document.querySelector('.fa-times')
let active_page_arr=['home','aboutUs','ourMenu','gallery','Catering','contactUs']
if(close_btn){
  
  let urlArr=(window.location.href.split('/'))
  let active=(urlArr[urlArr.length-1])
  if(active.length==0||active_page_arr.includes(active)==false){
    active='home';
  }
  document.querySelector(`.mobile_${active}`).classList.add('active_page_mobile')
  close_btn.addEventListener('click',(event)=>{
    document.getElementById('wrapper').style.display='block';
    document.querySelector('.toggled').style.display='none';
  })
}


//******************************************************************//
                // FOR order.pug
//******************************************************************//

const mapbox_token='pk.eyJ1IjoiYW1hbi1iaXNodCIsImEiOiJja2U2NnlvNDAxOXdxMnV1bGpvNXdrb2ViIn0.mQNeppkjfRLofCFeVYmvqQ';
const mapbox_style='mapbox://styles/aman-bisht/ckm6nx92729d417poq4a5hk5i'
const mapbox_center=[-64.77984334940605, 46.08867675806678]
const you=[-64.7620486,46.0765031]
function calculate_distance(center,user_location){
  var point1 = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": center
    }
  };
  var point2 = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": user_location
    }
  };
  var units = "miles";
  var distance = turf.distance(point1, point2, units);
  return(distance)
}



function generate_input(){
  let div =document.createElement('div')
  let p=document.createElement('p')
  p.textContent='Enter you address and we will see if we can deliver.'
  div.classList.add('geocoder')
  div.classList.add('col-lg-4')
  //div.classList.add('search_address')
  div.id='geocoder'
 
  div.style.cssText='border:1px solid black'
  div.style.textAlign='center'
  
  div.appendChild(p)
  document.querySelector('.about_order').appendChild(div)
}


let text1
let text2
let label1=document.getElementById('pickup')
let label2=document.getElementById('delivery')
if(label1&&label1.checked==true){
  text1='This is a pickup order';
  text2="You'll need to go to Garam Masala to pick up this order: 196 Robinson Street";
  
  document.querySelector('.about_order').innerHTML=`
                                <p><span style='
                                font-weight:600;font-size:20px'>${text1}</span>&ensp;
                                <span style='font-weight:550;'>${text2}</span></p>
                                `
}
if(label2){
  label2.addEventListener('click',()=>{

    document.querySelector('.delivery_title').innerHTML=`Delivery Charges:&ensp;<span style='font-weight:600'>$4.00</span>`
    document.querySelector('.about_order').innerHTML="<div id='map' class='col-lg-7 col-md-7 map'></div>"
    document.getElementById('map').style.height='50vh';
    
    mapboxgl.accessToken = mapbox_token;
    var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: mapbox_style, // style URL
    center: mapbox_center, // starting position [lng, lat]
    zoom: 12 // starting zoom
    });
    

    map.on('load',function(){
        map.loadImage(
          "https://img.icons8.com/doodle/35/000000/dining-room.png",
          function(error,image){
            if (error) throw error;
            map.addImage('custom-marker',image)
            map.addSource('points',{
              'type': 'geojson',
              'data': {
              'type': 'FeatureCollection',
              'features': [
                  {
                    // feature for Mapbox DC
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': mapbox_center
                    },
                    'properties': {
                    'title': 'Garam Masala'
                    }
                  }
                ]
              }
            })
            
            
            map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'points',
              'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
              }
            })
  
          }
        )
      })
    let user_location_obj=JSON.parse(localStorage.getItem("delivery_address"))
    if(user_location_obj){
      var geojson = {
        type: 'FeatureCollection',
        features: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: user_location_obj.center
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        }
      };
      
      var el = document.createElement('div');
      el.className = 'marker';
    
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(geojson.features.geometry.coordinates)
        .addTo(map); 
  
      map.flyTo({
        center: geojson.features.geometry.coordinates,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    
    }

    
    generate_input()
    var geocoder = new MapboxGeocoder({
      accessToken:mapbox_token,
      mapboxgl: mapboxgl,
      zoom: 12
      });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    geocoder.on('result', function(result) {
      if(result){
        let input_address=document.querySelector('.user_address')
        if(input_address){
          input_address.textContent=''
          input_address.textContent=result.result.place_name
        }
        else{
          let if_deliver=document.createElement('p')
          if_deliver.classList.add('if_deliver')
          document.querySelector('.geocoder').appendChild(if_deliver)
        }
      }
      let dist=calculate_distance(mapbox_center,result.result.center)
      let result_obj={
        name:result.result.place_name,
        distance:dist,
        center:result.result.center
      }
      localStorage.setItem('delivery_address',JSON.stringify(result_obj))
      document.querySelector('.mapboxgl-ctrl-geocoder').style.display='none'
      
      delivery_check(result_obj)
    })
    
       
    let delivery_address=JSON.parse(localStorage.getItem('delivery_address'));
    if(delivery_address){
      document.querySelector('.mapboxgl-ctrl-geocoder').style.display='none'
      let if_deliver=document.createElement('p')
      if_deliver.classList.add('if_deliver')
      document.querySelector('.geocoder').appendChild(if_deliver)
      delivery_check(delivery_address)
    }

  })
  label1.addEventListener('click',()=>{
    document.querySelector('.delivery_title').innerHTML=' '
    document.querySelector('.about_order').innerHTML=`
    <p><span style='
    font-weight:600;font-size:20px'>${text1}</span>&emsp;
    <span style='font-weight:550;'>${text2}</span></p>
    `
  })
}

const delivery_check=(obj)=>{
  let distance=obj.distance;
  let name=obj.name.split(',');
  if(distance<=10){
    document.querySelector('.if_deliver').innerHTML=`<span style='font-weight:550'>
                                Delivery Address:</span> ${name}
                                <button class='edit_address'>Edit</button>`
    document.querySelector('.if_deliver').style.color='black'
    document.querySelector('.type_of_order').textContent=`We will deliver this order at: ${name[0]},${name[1]}`
  }
  else if(distance>10){
    document.querySelector('.if_deliver').innerHTML=`<span style='font-weight:550'>
    Sorry We cannot deliver at:</span> ${name}
    <button class='edit_address'>Edit</button>`
    document.querySelector('.if_deliver').style.color='red' 
    document.querySelector('.type_of_order').textContent=`Sorry We cannot deliver at: ${name[0]},${name[1]}`    
  }
}

// ***************FOR THE DROPDOWN LIST ON THE TOP BAR***********************//
let drop_down=document.querySelector('.dropdown-menu')
const logout=async()=>{
  try{
    const res=await axios({
      method:'GET',
      url:'api/v1/user/logout'
    })
    if(res.data.status=='success'){
      console.log("aman is getting back to life.")
      //window.open('/home',"_self")
    }
  }
  catch(err){
    console.log(err)
  }
}

if(drop_down!=undefined){
  
  drop_down.addEventListener('click',async e=>{
    if(e.target.tagName=='A'&&e.target.id!="logout"){
      console.log(e.target.id)
      window.open(`/${e.target.id}`,"_self")
    }
    if(e.target.tagName=='A'&&e.target.id=="logout"){
      await logout();
      window.open('/home',"_self")
    }
  })
}





