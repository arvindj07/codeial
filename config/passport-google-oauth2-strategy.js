const passport= require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;// to use google-oauth2 strategy
const crypto= require('crypto'); //to generate an encrypted password that is to store in DB while signing-in/up using 
                                  //google, as password is a required field in User schema
const User = require('../models/user');

// To tell Passport to use Google strategy
passport.use(new googleStrategy({
    // setting the options
    clientID: "393761501294-q8cslu8hojllcibaln70varvopr5pdjf.apps.googleusercontent.com",
    clientSecret: "NQ3iRjtKoN5b4pPA-Ge_dXST",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  // The Callback function
  function(accessToken, refreshToken, profile, done) { 
    // Find a user
    // profile.emails[0].value is used to get the email of signed-in user 
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
      if(err){console.log('error in Google Strategy Passport ',err); return;}
      // console.log(accessToken);
      // console.log(refreshToken);
      // console.log(profile);

      // if the user is found in DB, then we return the user i.e.,set user as req.user
      // Sign-In
      if(user){
        return done(null,user);
      }
      // if the user is not found in DB, then we create the user in DB and set it as req.user
      //Sign-Up
      else{
        User.create({
          name: profile.displayName,  // Get the name of the user signed in using google using 'profile'
          email:profile.emails[0].value,// Get the email of the signed-in user
          password: crypto.randomBytes(20).toString('hex'), // To Generate Random Password
        },function(err,user){
          if(err){console.log('error in creating user ',err); return;}

          return done(null,user);
        });
      }
    });
  }
));

module.exports=passport;