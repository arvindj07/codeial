// we r Using Passport middleware coz , it uses session cookies for authentication and its stores the cookie for a session
// in an Encrypted Format so nobody can decrypt it, unlike in Manual Authentication, the cookie wasnt stored in encrypted form

const passport = require('passport');

// require Local Strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Creating the AUTHENTICATION function 
// i.e.,passport using Local Strategy to find the user who is signed in
passport.use(new LocalStrategy({
  usernameField: 'email'   // setting it to username field in schema, which is email in case of our User Schema
  },  
  function(email,password,done){  // email, password passed from the forms and done is a callback function, to check if 
                                  //there is an error or the authentication is successful etc..

    // find user and establish Identity
    User.findOne({email:email},function(err,user){
      if(err){
        console.log('Error in finding User ------> Passport');
        return done(err);  // report error to passport
      }

      //if user not found or password didnt match
      if(!user || user.password != password){
        console.log('Error in finding User ------> Passport');
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

module.exports = passport;