const express=require('express');
const userController=require('./../controller/userController')
const authController=require('./../controller/authController')
const router=express.Router();

router
  .route('/allUsers')
  .get(authController.protect,userController.getAllUsers)

router
  .route('/login')
  .post(authController.login)
router
  .route('/signUp')
  .post(authController.signUp)

router
  .route('/verifyEmailId')
  .patch(authController.protect,authController.verifyEmailId)

router
  .route('/logout')
  .get(authController.logOut)

router
  .route('/updatePassword')
  .patch(authController.protect,authController.updatePassword)

router
  .route('/updateMe')
  .patch(authController.protect,userController.updateMe)

router
  .route('/user/:id')
  .get(userController.getUserById)

router
  .route('/forgotPassword')
  .post(authController.forgotPassword)

router
  .route('/resetPassword/:resetToken')
  .patch(authController.resetPassword)

router
  .route('/lostSignUpCode')
  .post(authController.lostSignUpCode)

module.exports=router;