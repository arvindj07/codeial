const express= require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const { route } = require('./users');

router.get('/',homeController.home);

// as this is the default index pg for route, for any further route access from here, we use this
// NOTE: To use a routei.e,(router.use), the require() file should also export the router, in order for this router to use it
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));  // adding api's index.js  to root index 
//  router.use('/routerName',require('./routerFile'));

// console.log('router loaded');


module.exports = router;