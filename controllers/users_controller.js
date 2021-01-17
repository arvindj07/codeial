const User = require('../models/user');

// render the profile page
module.exports.profile = function(req,res){
  return res.render('user_profile',{
    title: 'Profile'
  });
};



// render the sign-up page
module.exports.signUp = function(req,res){

  // restricting sign-up pg access for logged-in user
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
  });
};



// render the Sign-in page
module.exports.signIn = function(req,res){

  // restricting sign-in pg access for logged-in user
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

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
  // redirects to homepage after sign-in
  return res.redirect('/');             // assuming that user has already signed-in,as passport use local strategy to
                                        // Auth. the user
}

// Logout the User i.e, Destroy the session
module.exports.destroySession = function(req,res){
  //logout() func is given to req byb Passport.js
  // here we r removing the user's session cookie to remove identity
  req.logout();

  return res.redirect('/');
}
