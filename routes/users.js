const express = require('express');
const router = express.Router();
const passport = require('passport');
const { pass } = require('../config/mongoose');

const usersController = require('../controllers/users_controller');

// to display profile page
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

// Update User Profile
router.post('/update/:id',passport.checkAuthentication,usersController.update);

// to display sign-in and sign-up pg
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// using sign-up form, create user into User collection after successful sign-up
router.post('/create',usersController.create);

// Sign-in Action
// use passport as a middleware to authenticate the user
router.post('/create-session',passport.authenticate(   // this is the middleware which is used to authenticate the user,
  'local',                   // its uses the local strategy that we defined ,nd returns user via done() if Auth successful
  {failureRedirect:'/users/sign-in'},
),usersController.createSession);  // if done then this action is called


router.get('/sign-out',usersController.destroySession);

// We r going to create 2 routes For Google Authentication

//1. One would be when I click the button for Google sign-in, it takes me to google nd data is fetched from there
//this route is set by Passport, its not the callback url
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']})); // scope defines what all info u 
                                                                                      //want to receive

//2. Second one would be when google fetches that data nd is sends back to me,on a route called CALLBACK_URL
// this the url at which we will receive the data
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'users/sign-in'}),usersController.createSession);// Once it has passed through the google Authentication using middleware(i.e,passport.authenticate()) 
              // it then calls create-session action
              // similar to passport-local




module.exports = router;