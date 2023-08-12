const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
//google startegy
passport.use(new googleStrategy({
    clientID:"803294153313-a856tqr3vf03osuu64286r98asf3tbv7.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
async function(accessToken,refreshToken,profile,done){
    const user=await User.findOne({email:profile.emails[0].value})

    if(!user){
       const user= await User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex')
        })
        if(user){
            return done(null,user)
        }

    }
    else{
        return done(null,user)
    }


}


))