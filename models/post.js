const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content:{
    type: String,
    required:true
  },
  // to store the info of User who posted the Post
  user:{
    type: mongoose.Schema.Types.ObjectId,   // to store only the id of user
    ref: 'User'                             //  refering to User Schema for this filed(i.e., user)
  },

  //include the array of ids of all comments in this Post Schema itself
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
  ]

},{
  timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;