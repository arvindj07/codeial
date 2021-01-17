const Post= require('../models/post');

//  Create a Post
module.exports.create =function(req,res){
  Post.create({
    content: req.body.content,
    user: req.user._id,       // getting this user from Passport strategy, from callback func done() whne authenticated
  },function(err,post){
    if(err){console.log('error in creating the post'); return;}

    return res.redirect('back');

  });
}