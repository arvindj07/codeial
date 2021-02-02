const nodemailer = require('nodemailer');
const ejs= require('ejs');
const path= require('path');
const env=require('./environment')

//NOTES: The func which sends mail is in mailers/comments_mailer

//Below func Defines the configuration using which we will be sending email

//The connection with the MAILING SERVER is set here
let transporter = nodemailer.createTransport(env.smtp);

//Below func Definies the TEMPLATE that is to be used

//Whenever we r sending html email, there exists some html/ejs files which we will be sending to the user 
//This func sets the path of those files
// relativePath is the place from where ,this func is called 

//renderTemplpate is set/used in mailers/comments_mailer.js
let renderTemplate= (data,relativePath) => {  // using arrow function for chnge
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath), // this path will contain all the html/ejs Templates
    data,  // the context of ejs file
    function(err,template){
      if(err){console.log('error in rendering template: ',err); return ;}

      mailHtml=template;  //set Template
    }
  )

  return mailHtml;
}

// Exporting 2 properties
module.exports= {
  transporter:transporter,
  renderTemplate: renderTemplate,
};