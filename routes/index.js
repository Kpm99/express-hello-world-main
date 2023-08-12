const express=require('express');
const router=express.Router();

//import home controller
const homeController=require('../controllers/homeController');

router.get('/',homeController.home);


router.use('/users',require('./users'))



module.exports=router;