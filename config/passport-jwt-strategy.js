//Just Read Passport-jwt Documentation

// NOTE: This strategy is used in the API requests only. ie., we use it in api controlllers and use it using POSTMAN

const passport=require('passport');
// This is used to import the Strategy
const JWTStrategy = require('passport-jwt').Strategy;
// This is used to import a module which will help to extract JWT from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User= require('../models/user');
const env= require('./environment');

//opts is an object containing options to control how the token is extracted from the request or verified.
let opts={
  // used to get the JWT token form req header
  jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),//here the Header is a list of Keys,which contains an Auth key
                                                    //(authurization key), which also has a set of keys, which contains a key called Bearer. This Bearer will contain JWT Token
  secretOrKey :env.jwt_secret, // Decryption key used o decrypt the token
};

// make passport use the jwt-startegy by passing opt and get back the Jwt Payload
// done is the callback func similar to the one in Passport-local strategy
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
  //Find the user making the req
  //jwtPayload._id contains the id of the user
  //here we r not checking mail and pwd like in local-strategy,instead ,just authenticating the user-id after user tried logging in
  User.findById(jwtPayload._id,function(err,user){
    if(err){ console.log('Error in finding User from JWT'); return done(err); }

    if(user){
      return done(null,user);
    }else{
      return done(null,false);
    }
  });

  // npm install jsonwebtoken- its used to create an encrypted token, which passport can later decrypt

}));

module.exports= passport;
