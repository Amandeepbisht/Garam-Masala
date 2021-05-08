const catchAsync=require('../utils/catchAsync');

const render_top_page_bar=(req,res,page)=>{
  let user=req.user;
  if(user){
    return res.status(200).render(page,{
      user:user
    });
  }
  res.status(200).render(page);
}

exports.homePage=catchAsync(async(req,res,next)=>{
  let page='home_page'
  render_top_page_bar(req,res,page)
})

exports.aboutUs=catchAsync(async(req,res,next)=>{
  let page='about_us'
  render_top_page_bar(req,res,page)
  
})

exports.ourMenu=catchAsync(async(req,res,next)=>{
  let page='our_menu'
  //res.status(200).render('our_menu');
  render_top_page_bar(req,res,page)
})

exports.gallery=catchAsync(async(req,res,next)=>{
  //res.status(200).render('gallery');
  let page='gallery';
  render_top_page_bar(req,res,page)
})

exports.catering=catchAsync(async(req,res,next)=>{
  //res.status(200).render('catering');
  let page='catering';
  render_top_page_bar(req,res,page);
})

exports.contactUs=catchAsync(async(req,res,next)=>{
  //res.status(200).render('contact_us');
  let  page='contact_us'
  render_top_page_bar(req,res,page);
})

exports.order=catchAsync(async(req,res,next)=>{
  res.status(200).render('order');
  // let page='order';
  // render_top_page_bar(req,res,page);
})

exports.login=catchAsync(async(req,res,next)=>{
  res.status(200).render('login');
})

exports.signUp=catchAsync(async(req,res,next)=>{
  res.status(200).render('signUp');
})

exports.forgotPassword=catchAsync(async(req,res,next)=>{
  res.status(200).render('forgotPassword');
})

exports.lostLoginLink=catchAsync(async(req,res,next)=>{
  res.status(200).render('lostLoginLink');
})

exports.updateMe=catchAsync(async(req,res,next)=>{
  let user=req.user
  res.status(200).render('updateMe',{user:user});
})

exports.updatePassword=catchAsync(async(req,res,next)=>{
  res.status(200).render('update_password');
})

exports.resetPassword=catchAsync(async(req,res,next)=>{
  res.status(200).render('resetPassword',{
    token:req.params.token
  });
})

exports.verifyEmailId=catchAsync(async(req,res,next)=>{
  res.status(200).render('verify_email_id');
})