const nodemailer= require('../config/nodemailer');

// Func which sends mail

//Whenever a new comment is made, this mailer should be called, so its called in COMMENTS_CONTROLLER
//this is another way of exporting a method
exports.newComment = (comment) => {
  console.log('Inside newComment mailer');

  //sendMail is a predefined arg, chk the documentation for more info
  nodemailer.transporter.sendMail({
    from: 'Codeial@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment Published", // Subject line
    html: "<b>Yup, your comment is now published</b>", // html body
  },
  (err,info) => {// callback func(). Here, info carries the info about the req that has been sent
    if(err){console.log('error in sending mail: ',err); return ;}

    console.log('Message sent: ',info);
    return;
  });
}