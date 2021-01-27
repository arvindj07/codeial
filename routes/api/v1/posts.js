const express=require('express');
const router=express.Router();
const passport = require('passport');

const postApi = require('../../../controllers/api/v1/posts_api'); // Post_api controller

router.get('/',postApi.index);// The link to access this route is- http://localhost:8000/api/v1/posts

//This is where we r using Passport-JWT STRATEGY

//passport.authenticate() will put authentication check over passport
// 'jwt' is the strategy used, session: false is used to avoid session cookies
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy); // To delete the Post, we r passing 
                                                                        //the id of the post as well to delete that     
                                    //particular post. We r using DELETE req, as we r making an api req to server using API-Postman
                              // The link to access this route is- http://localhost:8000/api/v1/posts/xxxxxx(ie, some id)

module.exports= router;