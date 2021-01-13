const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// to display profile page
router.get('/profile',usersController.profile);

// to display sign-in and sign-up pg
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// ussing sign-up form, create user into User collection after successful sign-up
router.post('/create',usersController.create);


module.exports = router;