const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  // comment belongs to a User
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // comment belongs to a Post
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
},{
  timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;