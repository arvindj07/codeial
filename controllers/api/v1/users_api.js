// Just like users controller
const User = require('../../../models/user');

// its used to create an encrypted token, which passport can later decrypt
const jwt = require('jsonwebtoken');

//action for sign-in
module.exports.createSession = async function(req,res){
  try{
    // find user
    let user=await User.findOne({email:req.body.email});

    // if user doesnt exist or incorrect username /password
    if(!user || user.password != req.body.password){
      return res.json(422,{
        message:"Invalid Username/Password"
      });
    }

    //if user found
    return res.json(200,{
      message:"Sign-In Successful, jwt Token Generated",
      data:{
        // here,the token is created and returned .
        // jwt.sign() is a func in jwt(jsonwebtoken) lib to generate token,
        //user.toJSON convert user to JSON obj, 'codeial' is the key used for encryption (it should be the same key used for decryption in Passport-jwt strategy), expiresIn - for setting expiry time for token
        // user.toJSON()- this is the part which gets encrypted
        token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
      }
    });

  }catch(err){
    console.log('******',err);
    return res.json(500,{
      message:"Internal Server Error"
    });
  }
}