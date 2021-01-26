const express=require('express');
const router=express.Router();

const postApi = require('../../../controllers/api/v1/posts_api'); // Post_api controller

router.get('/',postApi.index);// The link to access this route is- http://localhost:8000/api/v1/posts

module.exports= router;