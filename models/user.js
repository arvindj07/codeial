const mongoose = require('mongoose');

// settin-up Multer for File upload 
const multer= require('multer'); // its used to save the img uploaded ,into the AVATAR_PATH defined
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
  },
  avatar:{      // stores the file Path ,where the img will be stored
    type:String 
  }
},{
  timestamps:true
});

// Linking multer, AVATAR_PATH, avatar field in user schema 
// Define Storage
let storage = multer.diskStorage({
  // there is req, a file nd a call-back func  
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AVATAR_PATH))   //the 2nd arg is the exact/absolute path where the img need to be 
                                            //stored, __dirname gives the path of current directory i.e, ../models/users(we r within models directory), '..' is used to go one step above the directory path and then join to AVATAR_PATH
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

// To be Able to Use the storage
// uploadedAvatar is  static mathods to User model i.e., User.uploadedAvatar
//storing storage in multer's storage key
userSchema.statics.uploadedAvatar= multer({storage:storage}).single('avatar'); // avatar here represents the field in   
                                                                                //Schema
//static data member
userSchema.statics.avatarPath= AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;