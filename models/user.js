const mongoose = require('mongoose');

// settin-up Multer for File upload 
const multer= require('multer');
const path = require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars'); // this string has been converted to a path using 'path' module

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  } ,
  name:{
    type:String,
    required:true
  }
},{
  timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;