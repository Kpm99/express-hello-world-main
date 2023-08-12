const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user')

//passport local strategy
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
}
,async function(req,email,password,done){
  const user= await User.findOne({email:email})

  if(!user || user.password!=password){
     req.flash('error','Invalid Username/password')
     return done(null,false)
  }
  return done(null,user)
}));
//serialize user
passport.serializeUser(function(user,done){
    return done(null,user.id)

})
//deserialize user

passport.deserializeUser(async function(id,done){
    const user=await User.findById(id);
    return done(null, user)
})

//check if authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
        
    }

    return res.redirect('/users/sign-up')
    
}

passport.setAuthenticated=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user
       

    }
    return next()
}