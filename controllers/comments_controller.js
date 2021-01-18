const Comment= require('../models/comment');
const Post = require('../models/post');

// Create a comment ,here we have to add comment in both Comment Schema nd Post Schema Array
module.exports.create = async function(req,res){

  try{

    // first check whether the post exists
    let post = await Post.findById(req.body.post);

    // if post found
    if(post){
      let comment = await Comment.create({
        content: req.body.content,
        post:req.body.post,     // getting from the hidden input from the Form
        user: req.user._id,     // getting this user from Passport strategy, from callback func done() when authenticated
      });

      // Updating the Post on to which comment is added
      // here the comment is pushed to the array of comments in Post Schema
      post.comments.push(comment);  // it automatically fetch-out the id of comment nd push it
      post.save();      // we have to save after every update to store in DB, before this ,its only in the memory(RAM)

      return res.redirect('/');
    }

  }catch(err){
    console.log('Error',err);
    return;
  } 
  
}

//         DELETING a comment
module.exports.destroy = async function(req,res){

  try{

    let comment = await Comment.findById(req.params.id);

    // checking whether the user who is deleting the Comment is the one who Created it
    if(comment.user == req.user.id){
  
      let postId = comment.post;   // storing Post.id to delete the comment from the array in Post
      comment.remove();   // deleted
      
      // to Update the Post schema by deleting the coment from the array, $pull deletes the matching comment
      let post= await Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}});

      return res.redirect('back');
    }else{
      return res.redirect('back');
    }

  }catch(err){
    console.log('Error',err);
    return;
  }
  
}