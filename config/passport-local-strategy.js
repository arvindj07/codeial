// we r Using Passport middleware coz , it uses session cookies for authentication and its stores the cookie for a session
// in an Encrypted Format so nobody can decrypt it, unlike in Manual Authentication, the cookie wasnt stored in encrypted form

const passport = require('passport');

// require Local Strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Creating the AUTHENTICATION function 
// i.e.,passport using Local Strategy to find the user who is signed in
passport.use(new LocalStrategy({
  usernameField: 'email',   // setting it to username field in schema, which is email in case of our User Schema
  passReqToCallback: true,  //this helps to use req as first arg in the below func, which is used to setup flash msg
  },  
  function(req,email,password,done){  // email, password passed from the forms and done is a callback function, to check if 
                                  //there is an error or the authentication is successful etc..

    // find user and establish Identity
    User.findOne({email:email},function(err,user){
      if(err){
        req.flash('error',err);
        return done(err);  // report error to passport
      }

      //if user not found or password didnt match
      if(!user || user.password != password){
        req.flash('error','Invalid Username/Password');
        return done(null,false);//no error,but as user not found/incorrect pwd,so authentication not done,so we pass false
      }

      //no error, and successful Authentication
      return done(null,user);
    });

  }

));

// serializing the user to decide which key is to be kept in the cookie
// i.e, set user id into the cookie
passport.serializeUser(function(user,done){

  //encrypted format of id is automatically stored in the cookie
  // note:- the passport doesnt encrypts the cookie, its done by express-session lib
  done(null,user.id); 
});


// deserializing the user from key in the cookies
// after sign-in , when another req is made , we have to check which user is signed-in, so to check that we use deserializer, inorder to decode the encoded id
passport.deserializeUser(function(id,done){

  User.findById(id,function(err,user){
    if(err){
      console.log('Error in finding User ------> Passport');
      return done(err);
    }
    return done(null,user);
  });
});

//  Steps to send the current signed-in user data to views

//check if the user is Authenticated
passport.checkAuthentication = function(req,res,next){   // will be used as middleware
  // this function checks whether the user is signed-in or not, then pass-on the request to nxt func(controller func)
  if(req.isAuthenticated()){          
    return next();
  }

  //if user not signed-in
  return res.redirect('/users/sign-in');
};


// set the User for the Views
passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    // req.user contains the curr signed-in user from session cookie and we r sending this to locals for the views
    res.locals.user = req.user;  // req.user is already handled by passport
  }

  // next(); 
  return next();
};

module.exports = passport;