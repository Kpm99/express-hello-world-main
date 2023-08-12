//user model

const User=require('../models/user')

//profile page
module.exports.profile=async function(req,res){
    let user=await User.findById(req.params.id);

    return res.render('user_profile', {
        title: 'User Profile',
        user:user,
        id:req.user.id
    })
      
}
//user sign in
module.exports.signin=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
        
    }
    return res.render('signin',{title:"sign in"})
}

//user sign up
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
        
    }
    return res.render('signup',{title:'sign Up'})
}


//creating new user
module.exports.create=async function(req,res){
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','passwords not matching')
        return res.redirect('back');
    }
    else{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        req.flash('success','user created successfully');
        await User.create(req.body);
       
         return res.redirect('/users/sign-up')
    }
    else{
        req.flash('error','user already exists')
        return res.redirect('/users/sign-in')
    } 
}

}
//create session
module.exports.create_session= function(req,res){
   req.flash('success','logged in successfully')

    return res.redirect('/')
}
//destroy session
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error');
            
        }
        req.flash('success','logged out successfully')
    });
    req.flash('success','logged out successfully')
    
    return res.redirect('/')
}


//reset password
module.exports.reset_page=function(req,res){
    return res.render('reset',{title:'Reset Page'})
}

module.exports.reset=async function(req,res){
    const user=await User.findOne({email:req.body.email});
    if(!user){
        console.log('wrong email')
        return res.redirect('back')       
    }
    if(user.password!=req.body.password){
        console.log("wrong password")
        return res.redirect('back');
    }
    await User.findByIdAndUpdate(req.body.email,{password:req.body.new_password})
    
    return res.redirect('/users/sign-up')


}