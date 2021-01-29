const nodemailer = require('nodemailer');
const ejs= require('ejs');
const path= require('path');

//NOTES: The func which sends mail is in mailers/comments_mailer

//Defines the configuration using which we will be sending email

//The connection with the MAILING SERVER is set here
let transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {   // The gmail- account details of user to Establish their identity with gmail
    user: 'tommycruise1997', // user
    pass: 'ron@ldo7', // password
  },
});

//Definies the TEMPLATE that is to be used

//Whenever we r sending html email, there exists some html/ejs files which we will be sending to the user 
//This func sets the path of those files
// relativePath is the place from where ,this func is called 
let renderTemplate= (data,relativePath) => {  // using arrow function for chnge
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath), // this path will contain all the html/ejs Templates
    data,  // the context of ejs file
    function(err,template){
      if(err){console.log('error in rendering template: ',err); return ;}

      mailHtml=template;
    }
  )

  return mailHtml;
}

// Exporting 2 properties
module.exports= {
  transporter:transporter,
  renderTemplate: renderTemplate,
};