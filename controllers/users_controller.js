const User = require('../models/user');

// render the profile page
module.exports.profile = function(req,res){
  return res.render('user_profile',{
    title: 'Profile'
  });
};



// render the sign-up page
module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
  });
};




// render the Sign-in page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    title:"Codeial | Sign In"
  });
};




// get the sign-up data
module.exports.create = function(req,res){
  // check to confirm password
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }

  //check whether email already exists in the User collection
  User.findOne({email: req.body.email},function(err,user){
    if(err){console.log('error in finding user while sign-up');  return;}

    if(!user){
      // inserting 'user' info into collection/db
      User.create(req.body,function(err,user){
        if(err){console.log('error in creating user while sign-up');  return;}

       // redirect to sign-in page after successful insertion of user 
      return res.redirect('/users/sign-in');
      });

    }else{
      return res.redirect('back');
      
    }

  });

}



// sign and create a session for the user
module.exports.createSession = function(req,res){
  //steps to authenticate

  //find user
  User.findOne({email:req.body.email},function(err,user){
    if(err){console.log('error in finding user while sign-in');  return;}

    //handle user found
    if(user){

      // handle password which doesnt match
      if(user.password != req.body.password){
        return res.redirect('back');
      }

      //handle session creation
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');

    }else{
      //handle user not found
      return res.redirect('back');

    }   

  });

  

  

  

}
