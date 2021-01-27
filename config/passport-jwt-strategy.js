//Just Read Passport-jwt Documentation

const passport=require(passport);
// This is used to import the Strategy
const JWTStrategy = require('passport-jwt').Strategy;
// This is used to import a module which will help to extract JWT from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User= require('../models/user');

//opts is an object containing options to control how the token is extracted from the request or verified.
let opts={
  // used to get the JWT token
  jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),//here the Header is a list of Keys,which contains an Auth key
                                                    //(authurization key), which also has a set of keys, which contains a key called Bearer. This Bearer will contain JWT Token
  secretOrKey :'codeial', // Encryption nd Decryption key
};

// make passport use the jwt-startegy by passing opt and get back the Jwt Payload
// done is the callback func similar to the one in Passport-local strategy
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
  //Find the user making the req
  //jwtPayload._id contains the id of the user
  User.findById(jwtPayload._id,function(err,user){
    if(err){ console.log('Error in finding User from JWT'); return done(err); }

    if(user){
      return done(null,user);
    }else{
      return done(null,false);
    }
  });

}));

module.exports= passport;
