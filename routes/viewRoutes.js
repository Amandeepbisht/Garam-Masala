const express=require('express');
const authController=require('./../controller/authController')
const viewsController=require('./../controller/viewsController')
const userController=require('./../controller/userController')
const router=express.Router();

router.use(authController.isLoggedIn)
router.get('/',viewsController.homePage)
//router.get('/home',viewsController.homePage)
router.get('/aboutUs',viewsController.aboutUs) 
router.get('/ourMenu',viewsController.ourMenu) 
router.get('/gallery',viewsController.gallery)  
router.get('/catering',viewsController.catering)  
router.get('/contactUs',viewsController.contactUs)  
router.get('/order',viewsController.order)
router.get('/login',viewsController.login)
router.get('/signup',viewsController.signUp)
router.get('/forgotPassword',viewsController.forgotPassword)
router.get('/updatePassword',viewsController.updatePassword)
router.get('/resetPassword/:token',viewsController.resetPassword)
router.get('/lostSignUpCode',viewsController.lostLoginLink)
router.get('/updateMe',viewsController.updateMe)
router.get('/verify-email-id',viewsController.verifyEmailId)
// router.get('/user/:id',userController.getUserById)           

module.exports=router;