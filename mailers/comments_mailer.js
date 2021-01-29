const nodemailer= require('../config/nodemailer');

// Func which sends mail

//Whenever a new comment is made, this mailer should be called, so its called in COMMENTS_CONTROLLER
//this is another way of exporting a method
exports.newComment = (comment) => {
  // using the Template setter in nodemailer.js to get the template which is to be mailed
  let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs'); // setting renderTemplate 
                                                                                      //defined in nodemailer.js
                                                                                      //should provide .ejs extention

  //sendMail is a predefined arg, chk the documentation for more info
  nodemailer.transporter.sendMail({
    from: 'Codeial@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment Published", // Subject line
    html: htmlString, // html body
  },
  (err,info) => {// callback func(). Here, info carries the info about the req that has been sent
    if(err){console.log('error in sending mail: ',err); return ;}

    console.log('Message sent: ',info);
    return;
  });
}