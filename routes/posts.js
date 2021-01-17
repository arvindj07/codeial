const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

//only authenticated User can create a Post
router.post('/create',passport.checkAuthentication,postController.create) 

module.exports = router;