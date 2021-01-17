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
  }

},{
  timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;