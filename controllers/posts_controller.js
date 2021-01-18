const Post= require('../models/post');
const Comment= require('../models/comment');

//  Create a Post
module.exports.create = async function(req,res){

  try{
    await Post.create({
      content: req.body.content,
      user: req.user._id,       // getting this user from Passport strategy, from callback func done() whne authenticated
    });
  
    return res.redirect('back');

  }catch(err){
    console.log('Error',err);
    return;
  }
  
}


//   DELETING the Post
module.exports.destroy = async function(req,res){

  try{

    // check if post exists
    let post = await Post.findById(req.params.id);

    // checking whether the user who is deleting the Post is the one who Created it
    // .id means converting the object id into string(so not using _id)
    // here post.user gives id as its not populated yet
    if(post.user ==req.user.id ){
      post.remove();        // post deleted

       await Comment.deleteMany({post:req.params.id});
       return res.redirect('back');

    }else{
      return res.redirect('back');
    }

  }catch(err){
    console.log('Error',err);
    return;
  }
  
}