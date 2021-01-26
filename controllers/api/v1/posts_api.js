// Its like posts_controller , but For APIs

const Post = require('../../../models/post');

module.exports.index= async function(req,res){

//We r passing all the posts through Json obj,so first we r collecting all the posts from Post Schema
  let posts= await Post.find({})
    .sort('-createdAt')         // Used to Display the newest post first, using createdAt field in schema
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    });

  // returning json obj from server side(as this is the server side i.e, controller part)
  //200 here is the status code
  return res.json(200,{
    message:"List of Posts in v1",
    posts:posts  // Passing all the posts from the Post Schema
  });
}