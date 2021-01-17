// for every action in the controller u have to setup the route, controllers are collections of actions
const Post = require('../models/post');

module.exports.home = function(req,res){
  // to display the cookie passed in req using Inspect tool in browser
  // console.log(req.cookies);
  //to access the cookie and reset it while sending back response to browser
  // res.cookie('user_id',25);

  // to get all the posts in Post DB/collection and populate the User of each post
  Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
      title:'Codieal | Home',
      posts: posts
    });
  });

    
}

// module.exports.actionName= function(req,res){}