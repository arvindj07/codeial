const Comment= require('../models/comment');
const Post = require('../models/post');

// Create a comment ,here we have to add comment in both Comment Schema nd Post Schema Array
module.exports.create =function(req,res){

  // first check whether the post exists
  Post.findById(req.body.post,function(err,post){
    if(err){console.log('error in Finding the post'); return;}
    // if post found
    if(post){
      Comment.create({
        content: req.body.content,
        post:req.body.post,     // getting from the hidden input from the Form
        user: req.user._id,     // getting this user from Passport strategy, from callback func done() when authenticated
      },function(err,comment){
        if(err){console.log('error in creating the post'); return;}
        
        // Updating the Post on to which comment is added
        // here the comment is pushed to the array of comments in Post Schema
        post.comments.push(comment);  // it automatically fetch-out the id of comment nd push it
        post.save();      // we have to save after every update to store in DB, before this ,its only in the memory(Ram)
        return res.redirect('back');
    
      });
    }
  });
  
}

//         DELETING a comment
module.exports.destroy = function(req,res){
  Comment.findById(req.params.id,function(err,comment){
    // checking whether the user who is deleting the Comment is the one who Created it
    if(comment.user == req.user.id){

      let postId = comment.post;   // storing Post.id to delete the comment from the array in Post
      comment.remove();   // deleted
      
      // to Update the Post schema by deleting the coment from the array, $pull deletes the matching comment
      Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
        return res.redirect('back');
      });
    }else{
      return res.redirect('back');
    }
  });
}