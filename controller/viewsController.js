const catchAsync=require('./catchAsync');


exports.homePage=catchAsync(async(req,res,next)=>{
  res.status(200).render('home_page');
})

exports.aboutUs=catchAsync(async(req,res,next)=>{
  res.status(200).render('about_us');
})

exports.ourMenu=catchAsync(async(req,res,next)=>{
  res.status(200).render('our_menu');
})

exports.gallery=catchAsync(async(req,res,next)=>{
  res.status(200).render('gallery');
})

exports.catering=catchAsync(async(req,res,next)=>{
  res.status(200).render('catering');
})

exports.contactUs=catchAsync(async(req,res,next)=>{
  res.status(200).render('contact_us');
})

exports.order=catchAsync(async(req,res,next)=>{
  res.status(200).render('order');
})