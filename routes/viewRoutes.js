const express=require('express');
const viewsController=require('./../controller/viewsController')
const router=express.Router();

router.get('/',viewsController.homePage)
//router.get('/home',viewsController.homePage)
router.get('/aboutUs',viewsController.aboutUs) 
router.get('/ourMenu',viewsController.ourMenu) 
router.get('/gallery',viewsController.gallery)  
router.get('/catering',viewsController.catering)  
router.get('/contactUs',viewsController.contactUs)  
router.get('/order',viewsController.order)           

module.exports=router;