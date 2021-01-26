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
// Defining Storage properties of Multer
// Here we define ,in which folder should the uploaded img be stored
// diskstorage is used as we r storing the uplpoaded img in our local system
let storage = multer.diskStorage({
  // there is req, a file nd a call-back func  
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AVATAR_PATH))   //the 2nd arg is the exact/absolute path where the img need to be 
                                            //stored, __dirname gives the path of current directory i.e, ../models/users(we r within models directory), '..' is used to go one step above the directory path and then join to AVATAR_PATH
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())  //fieldname is the name of the field specified in the Form i.e, 'avatar'
  }
});

//To be Able to Use the storage defined .ie., when this func is called the file will uploaded in the System at Destination using Storage Properties Defined in Multer
// uploadedAvatar is  static mathods to User model i.e.,can be accessed using classname only- User.uploadedAvatar
//assigning the defined storage in multer's storage key
userSchema.statics.uploadedAvatar= multer({storage:storage}).single('avatar'); //single('avatar') means only one file 
                                                                              //will be uploaded for the fieldname avatar nd not multiple files
//static data member
userSchema.statics.avatarPath= AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;