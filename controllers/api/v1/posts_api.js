// Its like posts_controller , but For APIs

const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

// in this ACTION we r just getting the info of all the posts and returning it in JSON object, when api is used, in this case, the API request is made by Postman API app, we r just responding to the request send by Postman
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

// in this ACTION we r deleting the Post selected(i.e., a particular post is idetified using the id params,which is passed along with the api call in Postman) and associated comments and then returning the JSON object with a message of successful Deletion 
// NOTE: we r not checking for Authenticated Users here, as there r none, we r just checking the whether the api is working or not
module.exports.destroy = async function(req,res){

  try{

    // check if post exists
    let post = await Post.findById(req.params.id);

    // checking whether the user who is deleting the Post is the one who Created it
    // .id means converting the object id into string(so not using _id)
    // here post.user gives id as its not populated yet
    // if(post.user ==req.user.id ){
      post.remove();        // post deleted

       await Comment.deleteMany({post:req.params.id});

       return res.json(200,{
        message:"Post and associated comments Deleted!"
       });

    // }else{
    //   req.flash('error','Not Authorized to Delete Post');
    //   return res.redirect('back');
    // }

  }catch(err){
    // req.flash('error',err);
    return res.json(500,{
      message:"Internal Server Error"
    });
  }
  
}