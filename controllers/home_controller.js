// for every action in the controller u have to setup the route, controllers are collections of actions
const Post = require('../models/post');
const User = require('../models/user');

// Render Home page and Pass elements to the Views
// declairing async Function-  ASYNC AWAIT
module.exports.home =  async function(req,res){
  // to display the cookie passed in req using Inspect tool in browser
  // console.log(req.cookies);
  //to access the cookie and reset it while sending back response to browser
  // res.cookie('user_id',25);

  try{

    // to get all the posts in Post DB/collection and populate the User of each post
    // await is used to wait for the Async queries to get Complete,i.e, no multiple threads r created
    let posts= await Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    });

    let users = await User.find({});
    
    return res.render('home',{
      title:'Codieal | Home',
      posts: posts,
      all_users:users
    });
    
  }catch(err){
    console.log('Error',err);
  }
        
}

// module.exports.actionName= function(req,res){}