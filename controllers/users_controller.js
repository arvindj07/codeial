const User = require('../models/user');

// the problem in manual authentication is that there r many loop holes, like here we r not able to restrict the access of sign-in or sign-up page once the user is signed-in, as these pgs shouldnt be visible once signed-in
// to rectify this we have set-up checks at action lvl within the controller, like if(req.cookies.user_id) condition in profile-page rendering

//we can solve this problem at router lvl with less redundancy of code, nd for this we use PASSPORT.JS

// render the profile page
module.exports.profile = function(req,res){

  // check whether the cookie is set ,i.e., check for sign-in authentication to access profile page, otherwise revert back to sign-in page
  if(req.cookies.user_id){

    User.findById(req.cookies.user_id,function(err,user){
      
      //if user is found
      if(user){
        return res.render('user_profile',{
          title: 'User Profile',
          user: user
        });
      
      }else{
        return res.redirect('/users/sign-in');
      }  
    });

  }else{  //revert back to sign-in page, as not authorized
    return res.redirect('/users/sign-in');
  }
  
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
      //setup cookies for checking the authenticity
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');

    }else{
      //handle user not found
      return res.redirect('back');

    }   

  });
}


// Sign-Out the profile page and Reset the Cookie
module.exports.signOut = function(req,res){

  //Reseting the cookie to empty string
  // res.cookie('user_id','');

  //Or Delete th Cookie
  res.clearCookie('user_id');
  return  res.redirect('/users/sign-in');
}
