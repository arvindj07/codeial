const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for Session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//middleware to read the data passed by the forms using req.body ,method-POST
app.use(express.urlencoded());

//using cookie-parser
app.use(cookieParser());


// To SETUP the ASSETS folder for CSS and other files, so that the view files can access them through root folder ASSETS
app.use(express.static('./assets'));

// used to SETUP the LAYOUT that is used in Views, the filename is layout which is default names
// its placed before setting-up the views and view-engine coz the layout is to be set before as when it reaches views, the layout should be already set
app.use(expressLayouts);

//  extract STYLES and SCRIPTS from sub pages into the LAYOUT by SETTING the values in app object
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Here we Setup the View i.e., The Html/Ejs pages
// set up the view engine and the views
app.set('view engine','ejs');  //app.set(name,value) here using set() we set the values in the 'app' object
app.set('views','./views');

// middleware used to encrypt the cookie(session cookie)
app.use(session({
  name: 'codeial',                // name of the session-cookie
  // TODO change secret before deployment in production mode
  secret:'blahsomething',         // encryption key
  saveUninitialized:false,
  resave: false,
  cookie:{
    maxAge:(1000*60*100)          // the amount of time this cookie should be stored in ms, after that session-time-out
  }
}));

//middleware to use passport, and passport also controls the session
app.use(passport.initialize());
app.use(passport.session());

// This is where the route (folder) is setup  using middleware
//use express router
app.use('/',require('./routes'));  // can also give path as - require('./routes/index') , but it by default takes index   file only, as the name of this file(entry file) nd route file is same

app.listen(port,function(err){
  if(err){console.log(`Error while setting up the server: ${err}`); return;}

  console.log('Server running on port:', port);
});