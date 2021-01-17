const express= require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

// as this is the default index pg for route, for any further route access from here, we use this
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
//  router.use('/routerName',require('./routerFile'));

// console.log('router loaded');


module.exports = router;