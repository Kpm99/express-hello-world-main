const express=require('express');
//import controller
const userController=require('../controllers/users_controller');
const passport = require('passport');
const router=express.Router();
//routes
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);
router.post('/create',userController.create)
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-up'}
),userController.create_session)


router.get('/sign-out',userController.destroySession)
router.get('/reset_page',userController.reset_page);
router.post('/reset',userController.reset)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-up'}),userController.create_session)
module.exports=router