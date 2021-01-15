const express = require('express');
const router = express.Router();
const passport = require('passport');
const { pass } = require('../config/mongoose');

const usersController = require('../controllers/users_controller');

// to display profile page
router.get('/profile',passport.checkAuthentication,usersController.profile);

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


module.exports = router;