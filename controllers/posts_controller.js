const Post= require('../models/post');
const Comment= require('../models/comment');

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


//   DELETING the Post
module.exports.destroy = function(req,res){
  // check if post exists
  Post.findById(req.params.id,function(err,post){

    // checking whether the user who is deleting the Post is the one who Created it
    // .id means converting the object id into string(so not using _id)
    // here post.user gives id as its not populated yet
    if(post.user ==req.user.id ){
      post.remove();        // post deleted

      Comment.deleteMany({post:req.params.id},function(err){
        return res.redirect('back');
      });

    }else{
      return res.redirect('back');
    }
  });
}