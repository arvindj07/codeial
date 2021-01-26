const User = require('../models/user');
const fs= require('fs');
const path = require('path');



// render the profile page
module.exports.profile = function(req,res){
  User.findById(req.params.id,function(err,user){
    if(err){console.log('error in finding the user'); return;}

    return res.render('user_profile',{
      title: 'Profile',
      profile_user:user   // dont use user instead of profile user,as its the local-user who is signed in
    });
  });
  
};

// Update User Profile
module.exports.update = async function(req,res){
  //  user Authentication
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //     if(err){console.log('error in finding the user'); return;}

  //     req.flash('success','Updated!');
  //     return res.redirect('back');
  //   });
  // }else{
  //   req.flash('error','Unauthorized!');
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.params.id){

    try{
      // finding the User
      let user= await User.findById(req.params.id);

      // we cannot use req.body params directly as its a multipart-format, 
      // we can access the req.body params with the help of multer, ie., by using User.uploadedAvatar as it uses multer which takes in req as parameter in diskStorage

      // using the static function we r accessing the req.body to update(with the help multipart and multer)
      User.uploadedAvatar(req,res,function(err){
        if(err){console.log('********Multer Error: ',err); return;}
  
        user.name = req.body.name;
        user.email=req.body.email;
        // to chk if the img file is passed (as its not mandatory)
        if(req.file){
          //  to Delete the avatar img, if one already exists 
          //basically replacing the old file with new one
          if(user.avatar){
            // to delete the file we use fs.unlinkSync
            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
          }

          // this is saving the  path of uploaded file into the avatar field in the user
          user.avatar= User.avatarPath+'/'+req.file.filename;
        }
        user.save();
  
        return res.redirect('back');
      });
        
  
    }catch(err){
      req.flash('error',err);
      return res.redirect('back');  
    }

  }else{
    req.flash('error','Unauthorized!');
    return res.status(401).send('Unauthorized');
  }

  
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
  req.flash('success','Logged in successfully');  //as flash is an object,nd success is an argument/field of the object
  // redirects to homepage after sign-in
  return res.redirect('/');             // assuming that user has already signed-in,as passport use local strategy to
                                        // Auth. the user
}

// Logout the User i.e, Destroy the session
module.exports.destroySession = function(req,res){
  //logout() func is given to req byb Passport.js
  // here we r removing the user's session cookie to remove identity
  req.logout();
  req.flash('success','Logged out!');//to put these flash msgs into res,we use a middleware called middleware.js in config

  return res.redirect('/');
}
